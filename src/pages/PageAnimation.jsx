import React, { useState, useEffect, useRef } from 'react';
import './PageAnimation.css';

// --- ค่าคงที่ (Constants) ---
const fieldWidth = 600;
const fieldHeight = 400;
const diameter = 100;
const maxLeft = fieldWidth - diameter - 2;
const maxTop = fieldHeight - diameter - 2;
const vx = 5;
const vy = 5;

// --- คอมโพเนนต์ React ---
function PageAnimation() {
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  // สไตล์เริ่มต้นของลูกบอล (จะใช้รูปพื้นไม้เป็นพื้นหลังเสมอ)
  const [ballStyle, setBallStyle] = useState({
    backgroundImage: "none", // เริ่มต้นไม่มีรูปเฉพาะลูกบอล
    backgroundColor: "aliceblue",
  });

  const goRight = useRef(true);
  const goDown = useRef(true);

  useEffect(() => {
    if (!running) {
      return; 
    }

    const intervalId = setInterval(() => {
      setX(prevX => {
        let nextX = prevX;
        if (goRight.current) {
          nextX = prevX + vx;
          if (nextX > maxLeft) {
            nextX = maxLeft;
            goRight.current = false;
          }
        } else {
          nextX = prevX - vx;
          if (nextX < 0) {
            nextX = 0;
            goRight.current = true;
          }
        }
        return nextX;
      });

      setY(prevY => {
        let nextY = prevY;
        if (goDown.current) {
          nextY = prevY + vy;
          if (nextY > maxTop) {
            nextY = maxTop;
            goDown.current = false;
          }
        } else {
          nextY = prevY - vy;
          if (nextY < 0) {
            nextY = 0;
            goDown.current = true;
          }
        }
        return nextY;
      });

    }, 25);

    return () => clearInterval(intervalId);

  }, [running]);

  const runClick = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const changeBall = (type) => {
    // แก้ไข: ใช้ path ที่สัมพันธ์กับโฟลเดอร์ public (เริ่มต้นด้วย /)
    const images = {
      basketball: "Image/basketball.jpg",
      football: "Image/football.jpg",
      volleyball: "Image/volley.jpg",
      human: "Image/human.jpg", 
      cartoon: "Image/cartoon.jpeg", 
      logo: "Image/Starbucks1.png",
    };

    if (images[type]) {
      setBallStyle(prevStyle => ({
        ...prevStyle,
        backgroundImage: `url('${images[type]}')`,
        backgroundColor: "transparent",
      }));
    } else {
      setBallStyle(prevStyle => ({
        ...prevStyle,
        backgroundImage: "none",
        backgroundColor: "aliceblue",
      }));
    }
  };

  return (
    <>

      <div id="container">
        <div id="field" style={{ height: `${fieldHeight}px`, width: `${fieldWidth}px` }}>
          <div 
            id="ball" 
            style={{
              ...ballStyle,
              height: `${diameter}px`,
              width: `${diameter}px`,
              left: `${x}px`,
              top: `${y}px`,
            }}
          ></div>
        </div>

        <div id="control">
          <button 
            id="run" 
            className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
            onClick={runClick}
          >
            {running ? (
              <><i className="bi bi-pause-btn-fill">&nbsp;PAUSE</i></>
            ) : (
              <><i className="bi bi-play-btn-fill">&nbsp;RUN</i></>
            )}
          </button>
          <button className="btn btn-primary" onClick={() => changeBall('basketball')}>Basketball</button>
          <button className="btn btn-primary" onClick={() => changeBall('football')}>Football</button>
          <button className="btn btn-primary" onClick={() => changeBall('volleyball')}>Volleyball</button>
          <button className="btn btn-primary" onClick={() => changeBall('human')}>Human</button>
          <button className="btn btn-primary" onClick={() => changeBall('cartoon')}>Cartoon</button>
          <button className="btn btn-primary" onClick={() => changeBall('logo')}>Logo</button>
        </div>
      </div>
    </>
  );
}

export default PageAnimation;8116 