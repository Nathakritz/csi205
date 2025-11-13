import React from 'react';

const footerStyle = {
  backgroundColor: '#FFC0CB', 
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  marginTop: 'auto', // ดัน Footer ลงล่างสุดเสมอ
};

function Footer() {
  return (
     <footer style={footerStyle}>
      <p>มหาวิทยาลัยศรีปทุม (SPU)</p>
      <p>คณะเทคโนโลยีสารสนเทศ (IT) | สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ (CSI)</p>
      <p>ติดต่อ: Facebook : Nathakrit Kawinsatjadet | Instagram : _nathakrittttt</p>
    </footer>
  );
}

export default Footer;