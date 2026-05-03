import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import GiftCardDetail from "../components/GiftCardDetail";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../Services/api";

function CardDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/api/primegift/product/${id}`);

          setProduct(res.data.data || res.data.product);
      } catch (err) {
        console.error("Error fetching product", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* ✅ Loading */}
{loading && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "5px solid #ddd",
        borderTop: "5px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>

    <p style={{ marginTop: "12px", fontSize: "16px", color: "#555" }}>
      Loading...
    </p>

    {/* animation */}
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
)}
      {/* ❌ Error */}
      {error && <p style={{ padding: "20px", color: "red" }}>{error}</p>}

      {/* ✅ Success */}
      {!loading && !error && (
  <>
    <GiftCardDetail data={product} />
  </>
)}
    </>
  );
}

export default CardDetail;