import React, { useState } from "react";
// ไม่จำเป็นต้องใช้ Value.jsx

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 1. Title */}
      <h3 className="text-xl font-bold text-blue-600">COUNTER</h3>

      {/* 2. Controls & Display */}
      <div className="flex items-center justify-center gap-6 w-full p-4">
        <button 
          className="w-16 h-16 rounded-full font-bold text-4xl text-white bg-red-500 hover:bg-red-600 transition-colors flex-shrink-0"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>

        <span className="font-mono text-6xl font-bold text-gray-800 w-28 text-center">
          {count}
        </span>

        <button 
          className="w-16 h-16 rounded-full font-bold text-4xl text-white bg-green-500 hover:bg-green-600 transition-colors flex-shrink-0"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}