import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage'; // 1. Import LoginPage

function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // 3. --- นี่คือจุดที่แก้ไข ---
  // ปรับฟังก์ชัน HandleLogin
  // จากเดิม: const handleLogin = (name) => { ... }
  // เปลี่ยนเป็นรับ object { username, password } ที่ส่งมาจาก LoginPage
  const handleLogin = ({ username, password }) => {
    
    // หมายเหตุ: ในแอปพลิเคชันจริง
    // เราจะส่ง username และ password นี้ไปตรวจสอบกับ API หรือฐานข้อมูลก่อน
    // แต่ในตัวอย่างนี้ เราจะสมมติว่า login ถูกต้องเสมอ
    // console.log("Attempting login with:", username, password);

    setUsername(username); // ดึงค่า username จาก object มาใช้งาน
    setIsLoggedIn(true);
  };
  // --- สิ้นสุดจุดที่แก้ไข ---


  // 4. เพิ่มฟังก์ชัน HandleLogout
  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  // 5. ตรวจสอบสถานะ: ถ้ายังไม่ Login ให้แสดงหน้า LoginPage
  if (!isLoggedIn) {
    // ส่งฟังก์ชัน handleLogin ที่อัปเดตแล้วลงไป
    return <LoginPage onLogin={handleLogin} />;
  }

  // 6. ถ้า Login แล้ว ให้แสดง Layout หลักของแอป
  return (
    <div className="app-container">
      <Header />
      
      {/* 7. ส่ง props ที่จำเป็นไปให้ Navbar */}
      <Navbar 
        isLoggedIn={isLoggedIn} 
        username={username} 
        onLogout={handleLogout} 
      />
      
      <main className="app-content-outlet">
        <Outlet /> {/* Outlet คือพื้นที่ที่ Pages (Home, Calculator ฯลฯ) จะมาแสดงผล */}
      </main>
      
      <Footer />
    </div>
  );
}

export default AppLayout;