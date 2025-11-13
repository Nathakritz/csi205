import React, { useState } from "react";

function LoginPage({ onLogin }) {
  // 1. เปลี่ยนจาก name เป็น username และเพิ่ม state สำหรับ password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. ตรวจสอบว่ากรอกครบทั้งสองช่อง
    if (username.trim() === "" || password.trim() === "") {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }
    
    // 3. ส่งค่าเป็น object ที่มีทั้ง username และ password กลับไป
    onLogin({ username, password });
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f7e3ee, #cfc1e3)",
        borderRadius: "12px",
        margin: "1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ color: "#41547cff", marginBottom: "1rem" }}>เข้าสู่ระบบ</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* 4. Input สำหรับ Username */}
        <input
          type="text"
          placeholder="กรอกชื่อผู้ใช้ (Username)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "250px",
          }}
        />
        
        {/* 5. Input สำหรับ Password */}
        <input
          type="password"
          placeholder="กรอกรหัสผ่าน (Password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "250px",
          }}
        />
        
        <button
          type="submit"
          style={{
            backgroundColor: "#886c84ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "0.2s",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;