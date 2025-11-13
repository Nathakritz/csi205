import React from 'react';

// ใช้สไตล์แบบ inline เพื่อกำหนดสีตามโจทย์
const headerStyle = {
  backgroundColor: '#FFC0CB', 
  color: 'white',
  padding: '1.5rem',
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};


function Header() {
  return (
    <header style={headerStyle}>
      {/* ข้อมูลจาก student.txt */}
      <div>CSI205 การพัฒนาโปรแกรมส่วนหน้า</div>
    </header>
  );
}

export default Header;