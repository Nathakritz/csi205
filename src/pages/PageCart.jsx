import React from "react";
import CartItem from "@/components/CartItem";

const PageCart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <h2>My Cart</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "20px",
        }}
      >
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))
        ) : (
          <p>🛒 ยังไม่มีสินค้าในตะกร้า</p>
        )}
      </div>
      <div>
        <p>
          Products: <strong>{cart.length}</strong> items — Total price:{" "}
          <strong>${total.toFixed(2)}</strong>
        </p>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default PageCart;
