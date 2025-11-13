import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Layout หลัก
import AppLayout from "./AppLayout";

// Pages
import PageHome from "./pages/PageHome";
import PageCalculator from "./pages/PageCalculator";
import PageAnimation from "./pages/PageAnimation";
import PageComponent from "./pages/PageComponent";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

// Components
import Todos from "./components/Todos"; 

// Context
import { CartProvider } from "./context/CartContext";

// ✅ แก้ไขตรงนี้: เพิ่ม { basename: "/Work205" } ต่อท้าย array []
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <PageHome /> },
      { path: "home", element: <PageHome /> },
      { path: "calculator", element: <PageCalculator /> },
      { path: "animation", element: <PageAnimation /> },
      { path: "component", element: <PageComponent /> },
      { path: "todos", element: <Todos /> }, 
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
    ],
  },
], { basename: "/Work205" }); // <--- จุดสำคัญคือบรรทัดนี้ครับ

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);