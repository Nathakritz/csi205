import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Cart Page</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: item.color,
                    margin: "0 auto 10px",
                  }}
                ></div>
                <p>{item.name}</p>
                <p style={{ fontWeight: "bold" }}>${item.price}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete from Cart
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p>
              Products: <b>{cartItems.length}</b> items – Total Price:{" "}
              <b>${total.toFixed(2)}</b>
            </p>
            <button
              style={{
                backgroundColor: "orange",
                padding: "8px 16px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
