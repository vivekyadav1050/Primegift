import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import GiftCardDetail from "../components/GiftCardDetail";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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

        const res = await axios.get(`http://localhost:3000/api/primegift/product/${id}`);
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
      {loading && <p style={{ padding: "20px" }}>Loading...</p>}

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