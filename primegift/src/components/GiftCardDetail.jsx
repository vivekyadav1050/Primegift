import React, { useState, useEffect } from "react";
import "../styles/detailcard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GiftCardDetail({ data }) {
  const navigate = useNavigate();

  if (!data) return <p>Loading product...</p>;

  const isFixed = data.denominationType === "FIXED";

  const [loading, setLoading] = useState(false);
const [loadingStep, setLoadingStep] = useState("");

  const [selectedAmount, setSelectedAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // ✅ default value
  useEffect(() => {
    if (data) {
      if (isFixed) {
        setSelectedAmount(data.denominations?.[0] || "");
      } else {
        setSelectedAmount("");
      }
    }
  }, [data]);

  const options = isFixed ? data.denominations : [];

  const min = data.minAmount || 1;
  const max = data.maxAmount;

  // ✅ validation
  const isEmpty = !isFixed && selectedAmount === "";
  const isInvalid =
    !isFixed &&
    selectedAmount !== "" &&
    (selectedAmount < min || selectedAmount > max);

  const isValid = isFixed || (!isEmpty && !isInvalid);

  // 🔥 Discount logic
  const baseDiscount = data.discountPercent || 0;

  const discountPercent =
    paymentMethod === "UPI" || paymentMethod === "e-Pay"
      ? baseDiscount
      : Math.max(baseDiscount - 1, 0);

  const numericAmount = selectedAmount === "" ? 0 : selectedAmount;

  // ✅ FIXED decimal calculation (no float bugs)
  const discountValue = Number(
    ((numericAmount * discountPercent) / 100).toFixed(2)
  );

  const finalPrice = Number(
    (numericAmount - discountValue).toFixed(2)
  );

  // 🔥 Razorpay method restriction
  let methodConfig = {
    upi: false,
    card: false,
    netbanking: false,
    wallet: false
  };

  if (paymentMethod === "UPI") methodConfig.upi = true;
  if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card")
    methodConfig.card = true;
  if (paymentMethod === "e-Pay") methodConfig.netbanking = true;

  // 🔥 BUY FUNCTION
const handleBuyNow = async () => {
  try {
    if (!numericAmount || !isValid) {
      alert("Enter valid amount");
      return;
    }

    setLoading(true);
    setLoadingStep("Creating Order...");

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/api/primegift/createorder",
      {
        brandId: data.brandId,
        amount: numericAmount,
        paymentMethod: paymentMethod,
        payingAmount: finalPrice
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const { razorpayOrderId, amount, currency } = res.data;

    // 🔥 stop loader before opening Razorpay
    setLoading(false);
    setLoadingStep("Waiting for Payment...");

    const options = {
      key: "rzp_test_SVsSowcpInkLUC",
      amount,
      currency,
      order_id: razorpayOrderId,
      method: methodConfig,

      handler: async function (response) {
        try {
          setLoading(true);
          setLoadingStep("Processing Order...");

          const verifyRes = await axios.post(
            "http://localhost:3000/api/primegift/verifypayment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

          const { orderId } = verifyRes.data;

          setLoading(false);

          navigate(`/my_vouchers?orderId=${orderId}`);

        } catch {
          setLoading(false);
          alert("Payment verification failed ❌");
        }
      }

    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      setLoading(false);
      alert("Payment Failed ❌");
    });

    rzp.open();

  } catch (err) {
    setLoading(false);
    if (err.response?.status === 401) {
      navigate("/login");
      return;
    }
    console.error(err);
    alert("Something went wrong ❌");
  }
};

  return (

    
    
    <div className="detail-container">

{loading && (
  <div className="loader-overlay">
    <div className="spinner"></div>

  <div className="loader-steps">
  <p
    className={
      loadingStep !== "Creating Order..." ? "done" :
      loadingStep === "Creating Order..." ? "active" : ""
    }
  >
    Creating Order...
  </p>

  <p
    className={
      loadingStep === "Verifying Payment..." ? "active" :
      loadingStep === "Generating Voucher..." ? "done" : ""
    }
  >
    Verifying Payment...
  </p>

  <p
    className={
      loadingStep === "Generating Voucher..." ? "active" : ""
    }
  >
    Generating Voucher...
  </p>
</div>

  </div>
)} 

  {/* LEFT */}
      <div className="detail-left">
        <div className="image-wrapper">
          <img
            src={data.image || data.logo}
            alt={data.name}
            className="detail-card-image"
          />
        </div>

        <div className="brand-info">
          <h2 className="detail-title">{data.name}</h2>
          <span className="detail-badge">
            {data.redemptionType} Gift Card
          </span>
        </div>

        <div className="description-section">
          <p className="detail-description">
            {data.description || "Use this gift card on selected brand."}
          </p>
        </div>

        {/* HOW TO USE */}
        {data.howToUse?.length > 0 && (
          <div className="description-section">
            <h3>How to Use</h3>
            {data.howToUse.map((item, i) => (
              <div key={i}>
                <strong>{item.retailModeName}</strong>
                <ul>
                  {item.instructions?.map((step, j) => (
                    <li key={j}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TERMS */}
        {data.termsAndConditions?.length > 0 && (
          <div className="description-section">
            <h3>Terms & Conditions</h3>
            <ul>
              {data.termsAndConditions.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {data.tncUrl && (
          <a href={data.tncUrl} target="_blank" rel="noreferrer" className="tnc-link">
            View Terms & Conditions →
          </a>
        )}
      </div>

      {/* RIGHT */}
      <div className="detail-right">
        <div className="purchase-card">

          <h3 className="section-heading">Select Amount</h3>

          {isFixed && (
            <div className="amount-grid">
              {options.map((amt) => (
                <div
                  key={amt}
                  className={`amount-card ${selectedAmount === amt ? "active" : ""}`}
                  onClick={() => setSelectedAmount(amt)}
                >
                  ₹ {amt.toLocaleString()}
                </div>
              ))}
            </div>
          )}

          {!isFixed && (
            <div className="flexible-input-wrapper">
              <label className="input-label">Enter Amount</label>

              <input
                type="number"
                value={selectedAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") return setSelectedAmount("");
                  setSelectedAmount(Number(value));
                }}
                className={`amount-input ${isEmpty || isInvalid ? "error" : ""}`}
                placeholder="Enter amount"
              />

              <div className="input-hint">
                Min: ₹{min} | Max: ₹{max}
              </div>

              {isEmpty && <p className="error-text">Amount is required</p>}
              {isInvalid && (
                <p className="error-text">
                  Enter between ₹{min} and ₹{max}
                </p>
              )}
            </div>
          )}

          <h3 className="section-heading">Payment Method</h3>

          <div className="payment-options">
            {["UPI", "Credit Card", "Debit Card", "e-Pay"].map((method) => (
              <div
                key={method}
                className={`payment-card ${paymentMethod === method ? "active" : ""}`}
                onClick={() => setPaymentMethod(method)}
              >
                <span className="payment-name">{method}</span>
                <span className="payment-discount">
                  {method === "UPI" || method === "e-Pay"
                    ? `${data.discountPercent || 0}% off`
                    : `${Math.max((data.discountPercent || 0) - 1, 0)}% off`}
                </span>
              </div>
            ))}
          </div>

          <div className="price-summary">
            <div className="price-row">
              <span>Gift Card Value</span>
              <span>₹ {numericAmount.toFixed(2)}</span>
            </div>

            <div className="price-row discount">
              <span>Discount ({discountPercent}%)</span>
              <span>- ₹ {discountValue.toFixed(2)}</span>
            </div>

            <div className="price-row total">
              <span>You Pay</span>
              <span>₹ {finalPrice.toFixed(2)}</span>
            </div>
          </div>

         <button
  disabled={!isValid || loading}
  className="buy-now-btn"
  onClick={handleBuyNow}
>
  {loading ? "Processing..." : "Buy Now →"}
</button>

        </div>
      </div>
    </div>
  );
}