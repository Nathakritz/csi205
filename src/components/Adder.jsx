import React, { useState } from "react";
// ไม่จำเป็นต้องใช้ Value.jsx แล้ว เพราะเราจะแสดงผลตัวเลขโดยตรง

export default function Adder() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const sum = a + b;

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน input
  const handleAChange = (e) => {
    setA(Number(e.target.value) || 0);
  };

  const handleBChange = (e) => {
    setB(Number(e.target.value) || 0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 1. Title */}
      <h3 className="text-xl font-bold text-indigo-600">ADD</h3>

      {/* 2. Display Results (แสดงผลลัพธ์) */}
      <div className="w-full p-3 bg-gray-100 rounded-lg text-center shadow-inner">
        <span className="font-mono text-gray-700">A = {a}</span>
        <span className="font-mono font-bold text-indigo-700 mx-4">
          A + B = {sum}
        </span>
        <span className="font-mono text-gray-700">B = {b}</span>
      </div>

      {/* 3. Controls for A (ส่วนควบคุม A) */}
      <div className="flex items-center gap-3 w-full">
        <label className="font-medium text-gray-700 w-8 text-lg">A</label>
        <button
          onClick={() => setA(a - 1)}
          className="flex-shrink-0 w-10 h-10 font-bold text-2xl rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={a}
          onChange={handleAChange}
          className="w-full text-center text-xl font-bold p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={() => setA(a + 1)}
          className="flex-shrink-0 w-10 h-10 font-bold text-2xl rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>

      {/* 4. Controls for B (ส่วนควบคุม B) */}
      <div className="flex items-center gap-3 w-full">
        <label className="font-medium text-gray-700 w-8 text-lg">B</label>
        <button
          onClick={() => setB(b - 1)}
          className="flex-shrink-0 w-10 h-10 font-bold text-2xl rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={b}
          onChange={handleBChange}
          className="w-full text-center text-xl font-bold p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={() => setB(b + 1)}
          className="flex-shrink-0 w-10 h-10 font-bold text-2xl rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}