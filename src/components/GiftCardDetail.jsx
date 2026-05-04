import React, { useState, useEffect } from "react";
import "../styles/detailcard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function GiftCardDetail({ data }) {
  const navigate = useNavigate();

  if (!data) return <p>Loading product...</p>;

  const isFixed = data.denominationType === "FIXED";

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const [selectedAmount, setSelectedAmount] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("UPI");

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

  const isEmpty = !isFixed && selectedAmount === "";
  const isInvalid = !isFixed && selectedAmount !== "" && (selectedAmount < min || selectedAmount > max);
  const isValid = isFixed || (!isEmpty && !isInvalid);

  const baseDiscount = data.discountPercent || 0;
  // const discountPercent = paymentMethod === "UPI" || paymentMethod === "e-Pay" ? baseDiscount : Math.max(baseDiscount - 1, 0);
  const discountPercent = baseDiscount;
  const numericAmount = selectedAmount === "" ? 0 : selectedAmount;
  const discountValue = Number(((numericAmount * discountPercent) / 100).toFixed(2));
  const finalPrice = Number((numericAmount - discountValue).toFixed(2));

    let methodConfig = {
      upi: true,
      card: false,
      netbanking: false,
      wallet: false
    };


  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue");
      navigate("/login", { state: { message: "Please login to continue" } });
      return;
    }

    try {
      if (!numericAmount || !isValid) {
        alert("Enter valid amount");
        return;
      }

      setLoading(true);
      setLoadingStep("Creating Order...");

      const res = await API.post("/api/primegift/createorder", {
        brandId: data.brandId,
        amount: numericAmount,
        paymentMethod: "UPI",
        payingAmount: finalPrice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { razorpayOrderId, amount, currency } = res.data;

      setLoading(false);
      setLoadingStep("Waiting for Payment...");

      const options = {
        key: "rzp_live_SlMz5voz3CXR2c",
        amount,
        currency,
        order_id: razorpayOrderId,
        method: methodConfig,
        handler: async function (response) {
          try {
            setLoading(true);
            setLoadingStep("Processing Order...");
            const verifyRes = await API.post("/api/primegift/verifypayment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
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
      if (err?.response?.status === 401) {
        navigate("/login");
        return;
      }
      alert("Something went wrong or invalid response from server ");
    }
  };

  return (
    <div className="gift-detail-modern">
      {loading && (
        <div className="modern-loader">
          <div className="loader-content">
            <div className="loader-spinner"></div>
            <div className="loader-steps">
              <div className={`step ${loadingStep === "Creating Order..." ? "active" : loadingStep !== "Creating Order..." && loadingStep !== "Waiting for Payment..." ? "completed" : ""}`}>
                <div className="step-icon">1</div>
                <span>Creating Order</span>
              </div>
              <div className={`step ${loadingStep === "Processing Order..." ? "active" : loadingStep === "Processing Order..." ? "active" : ""}`}>
                <div className="step-icon">2</div>
                <span>Processing Payment</span>
              </div>
              <div className={`step ${loadingStep === "Generating Voucher..." ? "active" : ""}`}>
                <div className="step-icon">3</div>
                <span>Generating Voucher</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modern-container">
        {/* Left Column - Product Info */}
        <div className="product-gallery">
          <div className="gallery-card">
            <div className="product-badge">
              {data.discountPercent > 0 && <span className="badge-save">{data.discountPercent}% OFF</span>}
              <span className="badge-type">{data.redemptionType}</span>
            </div>
            <div className="product-image">
              <img src={data.image || data.logo} alt={data.name} />
            </div>
          </div>

          <div className="info-card">
            <h1 className="product-name">{data.name}</h1>
            <div className="product-meta">
        
            </div>

            {/* How to Use */}
         {data.usageInstructions && (
  <div className="info-section">
    <h3>How to Use</h3>

    {Object.entries(data.usageInstructions).map(([mode, steps], i) => (
      <div key={i} className="howto-item">
        <div className="icon">✓</div>
        <div className="content">
          <strong>{mode}</strong>
          <ul>
            {steps.map((step, j) => (
              <li key={j}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
)}


            {/* Terms & Conditions */}
            {data.termsAndConditions?.length > 0 && (
              <div className="info-section">
                <h3>Terms & Conditions</h3>
                <ul className="terms-list">
                  {data.termsAndConditions.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

         
          </div>
        </div>

        {/* Right Column - Purchase */}
        <div className="purchase-panel">
          <div className="price-header">
            <span className="label">Payable Amount</span>
            <div className="price">
              <span className="currency">₹</span>
              {finalPrice.toFixed(2)}
            </div>
            {discountPercent > 0 && (
              <div className="savings">
                Save {discountPercent}% (₹{discountValue.toFixed(2)})
              </div>
            )}
          </div>

          {/* Amount Selection */}
          <div className="selection-group">
            <label>Select Amount</label>
            {isFixed ? (
              <div className="amount-grid">
                {options.map((amt) => (
                  <button
                    key={amt}
                    className={`amount-option ${selectedAmount === amt ? "active" : ""}`}
                    onClick={() => setSelectedAmount(amt)}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            ) : (
              <div className="custom-amount">
                <div className="amount-input-wrapper">
                  <span className="currency-symbol">₹</span>
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
                </div>
                <div className="range-hint">
                  Min: ₹{min} • Max: ₹{max}
                </div>
                {isEmpty && <div className="error-message">Amount is required</div>}
                {isInvalid && <div className="error-message">Amount must be between ₹{min} and ₹{max}</div>}
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="selection-group">
            <label>Payment Method</label>
          <div className="payment-methods">
          <div className="payment-method active">
            <div className="method-info">
              <span className="method-icon">📱</span>
              <span className="method-name">UPI</span>
            </div>
            <span className="method-discount">
              {data.discountPercent || 0}% off
            </span>
          </div>
        </div>
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="breakdown-row">
              <span>Gift Card Value</span>
              <span>₹{numericAmount.toFixed(2)}</span>
            </div>
            <div className="breakdown-row discount">
              <span>Discount ({discountPercent}%)</span>
              <span>-₹{discountValue.toFixed(2)}</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Amount</span>
              <span>₹{finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={!isValid || loading}
            className="purchase-button"
            onClick={handleBuyNow}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Processing...
              </>
            ) : (
              <>Buy Now</>
            )}
          </button>

          <div className="secure-checkout">
            <span className="lock-icon">🔒</span>
            Secure checkout • 100% protected
          </div>
        </div>
      </div>
    </div>
  );
}