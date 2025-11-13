import React from "react";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        textAlign: "center",
        width: "180px",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        width="150"
        height="150"
      />
      <p>{item.title}</p>
      <p>${item.price.toFixed(2)}</p>
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete from Carts
      </button>
    </div>
  );
};

export default CartItem;
