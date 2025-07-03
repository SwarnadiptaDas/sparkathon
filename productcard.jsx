 import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, availableAt }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p><strong>Price:</strong> {product.price}</p>
      <p><strong>CO₂ Emission:</strong> {product.co2Emission} kg/unit</p>
      <p><strong>Features:</strong> {product.features}</p>
      {availableAt && (
        <p><strong>Available at:</strong> {availableAt}</p>
      )}
      <div>
        <strong>Setup Guide:</strong>
        <ul>
          {product.setupGuide.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
