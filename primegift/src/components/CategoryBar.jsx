import React from "react";
import "../styles/CategoryBar.css";

function CategoryBar({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-wrapper">
      <div className="category-bar">
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`category-item ${
              activeCategory === cat.value ? "active" : ""
            }`}
            onClick={() => onSelect(cat)}
          >
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;