import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/global.css";
import GiftGrid from "../components/Giftcard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Home");
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { label: "All", value: "All" },
    { label: "Dining", value: "FOOD" },
    { label: "E-Commerce", value: "ONE_STOP_SHOPS" },
    { label: "Electronics", value: "ELECTRONICS" },
    { label: "Fashion", value: "FASHION" },
    { label: "Home Needs", value: "GROCERY" }
  ];

  // ✅ API CALL (WITH SEARCH + PAGE)
  const fetchProducts = async (
    category = "All",
    pageNum = 1,
    search = ""
  ) => {
    try {
      setLoading(true);

      let url = `http://localhost:3000/api/primegift/allproduct?page=${pageNum}`;

      if (category !== "All") {
        url += `&category=${category}`;
      }

      if (search) {
        url += `&search=${search}`;
      }

      const res = await axios.get(url);

      const formatted = res.data.products.map(item => ({
        name: item.name,
        image: item.image,
        logo: item.logo,
        id: item.id || item.brandId,
        offer:
          item.discount >= 10
            ? `🔥 ${item.discount}% OFF`
            : `${item.discount}% OFF`
      }));

      setGifts(formatted);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ SEARCH (DEBOUNCED)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(activeCategory, 1, searchTerm);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // ✅ CATEGORY CHANGE
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat.value);
    fetchProducts(cat.value, 1, searchTerm);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  // ✅ SMART PAGINATION (LIMIT BUTTONS)
  const getPages = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="app">
      {isOpen && <div className="overlay" onClick={handleOverlayClick} />}

      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={handleCategoryClick}
      />

      {/* PRODUCTS */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <GiftGrid filteredGifts={gifts} />
      )}

      {/* 🔥 PAGINATION */}
      <div className="pagination">

        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() =>
            fetchProducts(activeCategory, page - 1, searchTerm)
          }
        >
          ⬅
        </button>

        {/* Page Numbers */}
        {getPages().map((pageNum) => (
          <button
            key={pageNum}
            className={page === pageNum ? "active-page" : ""}
            onClick={() =>
              fetchProducts(activeCategory, pageNum, searchTerm)
            }
          >
            {pageNum}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() =>
            fetchProducts(activeCategory, page + 1, searchTerm)
          }
        >
          ➡
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Home;