import React from 'react';

const homeStyle = {
  padding: '1.5rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  maxWidth: '800px',
  margin: '0 auto',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

function PageHome() {
  return (
    <div style={homeStyle}>
      <h2 style={{ textAlign: 'center' }}></h2>
      
      {/* แก้ไข: เพิ่มรูปนักศึกษา (Image 1) */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img 
          src="/Image/human.jpg" // Path ไปยังรูปของคุณใน public/images/
          alt="รูปนักศึกษา" 
          style={{ width: '150px', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} 
        />
      </div>

      <p><strong>รหัสนักศึกษา:</strong> 67158212</p>
      <p><strong>ชื่อ-สกุล:</strong> ณธกฤต กวินสัจจาเดช</p>
      <p><strong>ชั้นปี/สาขา/คณะ:</strong> ชั้นปีที่ 2 / สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ (CSI) / คณะเทคโนโลยีสารสนเทศ (IT)</p>
      <p><strong>มหาวิทยาลัย:</strong> มหาวิทยาลัยศรีปทุม (SPU)</p>
      
      
    </div>
  );
}

export default PageHome;