import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ➕ เพิ่มสินค้าในตะกร้า
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // ❌ ลบสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧮 ตัวนับจำนวนสินค้า
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
