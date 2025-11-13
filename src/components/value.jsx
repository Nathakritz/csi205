import React from "react";

export default function Value({ value, type = "real" }) {
  if (value === "" || value === null || isNaN(value)) value = 0;
  const formattedValue =
    type === "integer" ? Math.round(value) : parseFloat(value).toFixed(2);
  return <span>{formattedValue}</span>;
}