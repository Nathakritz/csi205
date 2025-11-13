import React, { useEffect, useState } from "react";
import { fetchProducts } from "../data/products";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = fetchProducts();
    setProducts(data);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
