import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div
      style={{
        width: "180px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={product.thumbnailUrl}
        alt={product.title}
        width="150"
        height="150"
      />
      <h4 style={{ fontSize: "0.9rem" }}>{product.title}</h4>
      <p>${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Carts
      </button>
    </div>
  );
};

export default ProductCard;
