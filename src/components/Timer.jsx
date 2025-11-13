import React, { useState, useEffect } from "react";

export default function Timer() {
  // แก้ไข: เปลี่ยนค่าเริ่มต้นเป็น 0 เพื่อให้เป็น Stopwatch ที่ถูกต้อง
  const [seconds, setSeconds] = useState(0); 
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const handleToggle = () => {
    setRunning((prev) => !prev);
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  // แยกส่วน Logic การแสดงผลเวลาออกมา
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    // แสดงผลเป็น "01:05"
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 1. Title */}
      <h3 className="text-xl font-bold text-teal-600">TIMER</h3>

      {/* 2. Display */}
      <div className="w-full p-4 bg-gray-100 rounded-lg text-center shadow-inner">
        <span className="font-mono text-5xl font-bold text-gray-800">
          {formatTime()}
        </span>
      </div>

      {/* 3. Buttons */}
      <div className="flex justify-between gap-4 w-full">
        <button
          onClick={handleReset}
          className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          🔄 Reset
        </button>
        <button
          onClick={handleToggle}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
            running 
              ? "bg-yellow-500 hover:bg-yellow-600" 
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {running ? "❚❚ Pause" : "▷ Run"}
        </button>
      </div>
    </div>
  );
}