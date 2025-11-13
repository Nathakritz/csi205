import React, { useState, useEffect } from "react";
// ไม่จำเป็นต้องใช้ Value.jsx

export default function Temperatures() {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState(77);
  const [kelvin, setKelvin] = useState(298.15);
  
  // Active state ช่วยป้องกันการ loop ของ useEffect
  const [active, setActive] = useState("celsius"); 

  // --- Logic การคำนวณ (คงเดิม) ---
  useEffect(() => {
    if (active === "celsius") {
      const c = parseFloat(celsius) || 0;
      setFahrenheit((c * 9) / 5 + 32);
      setKelvin(c + 273.15);
    }
  }, [celsius, active]);

  useEffect(() => {
    if (active === "fahrenheit") {
      const f = parseFloat(fahrenheit) || 0;
      setCelsius(((f - 32) * 5) / 9);
      setKelvin(((f - 32) * 5) / 9 + 273.15);
    }
  }, [fahrenheit, active]);

  useEffect(() => {
    if (active === "kelvin") {
      const k = parseFloat(kelvin) || 0;
      setCelsius(k - 273.15);
      setFahrenheit(((k - 273.15) * 9) / 5 + 32);
    }
  }, [kelvin, active]);

  // --- Helper Functions สำหรับ Handlers ---
  // ใช้ .toFixed(2) เพื่อแสดงผลทศนิยม 2 ตำแหน่ง
  // ใช้ parseFloat เพื่อป้องกันการบันทึกค่า string ว่าง
  const handleCelsiusChange = (e) => {
    setActive("celsius");
    setCelsius(e.target.value);
  };
  const handleFahrenheitChange = (e) => {
    setActive("fahrenheit");
    setFahrenheit(e.target.value);
  };
  const handleKelvinChange = (e) => {
    setActive("kelvin");
    setKelvin(e.target.value);
  };

  // --- JSX ที่ใช้ Tailwind ---
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h3 className="text-xl font-bold text-orange-600">TEMPERATURES</h3>

      {/* Container ที่ responsive: เรียงแนวนอนบนจอใหญ่, แนวตั้งบนจอเล็ก */}
      <div className="flex flex-col md:flex-row justify-around gap-6 w-full">

        {/* --- Celsius --- */}
        <UnitControl
          label="Celsius"
          unit="°C"
          value={celsius}
          onChange={handleCelsiusChange}
          onDecrement={() => { setActive("celsius"); setCelsius(parseFloat(celsius) - 1); }}
          onIncrement={() => { setActive("celsius"); setCelsius(parseFloat(celsius) + 1); }}
          color="blue"
        />
        
        {/* --- Fahrenheit --- */}
        <UnitControl
          label="Fahrenheit"
          unit="°F"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          onDecrement={() => { setActive("fahrenheit"); setFahrenheit(parseFloat(fahrenheit) - 1); }}
          onIncrement={() => { setActive("fahrenheit"); setFahrenheit(parseFloat(fahrenheit) + 1); }}
          color="green"
        />

        {/* --- Kelvin --- */}
        <UnitControl
          label="Kelvin"
          unit="°K"
          value={kelvin}
          onChange={handleKelvinChange}
          onDecrement={() => { setActive("kelvin"); setKelvin(parseFloat(kelvin) - 1); }}
          onIncrement={() => { setActive("kelvin"); setKelvin(parseFloat(kelvin) + 1); }}
          color="purple"
        />
      </div>
    </div>
  );
}

// --- สร้าง Helper Component เพื่อลดการเขียนโค้ดซ้ำ ---
function UnitControl({ label, unit, value, onChange, onDecrement, onIncrement, color }) {
  // จัดการการแสดงผลทศนิยม
  const displayValue = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "0.00";
    // ถ้าเป็นเลขทศนิยม ให้แสดง 2 ตำแหน่ง, ถ้าเป็นเลขจำนวนเต็ม ไม่ต้องแสดง
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  }

  const colorClasses = {
    blue: { text: "text-blue-600", border: "focus:border-blue-500" },
    green: { text: "text-green-600", border: "focus:border-green-500" },
    purple: { text: "text-purple-600", border: "focus:border-purple-500" },
  };
  
  const c = colorClasses[color] || colorClasses.blue;

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-inner flex-1">
      <label className={`font-semibold text-lg ${c.text}`}>{label}</label>
      
      <div className={`text-3xl font-bold ${c.text}`}>
        {displayValue(value)} {unit}
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onDecrement}
          className="w-8 h-8 rounded-full font-bold text-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={onChange}
          className={`w-28 text-center text-xl font-bold p-2 border-2 border-gray-200 rounded-lg focus:outline-none ${c.border}`}
        />
        <button 
          onClick={onIncrement}
          className="w-8 h-8 rounded-full font-bold text-lg text-white bg-green-500 hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}