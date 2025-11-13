import React, { useState, useEffect } from 'react';
import './PageCalculator.css'; // นำเข้า CSS ของเครื่องคิดเลข

function PageCalculator() {
  // --- 1. แปลง Logic จาก script.js เป็น React State ---
  const [display, setDisplay] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const [lastSecondValue, setLastSecondValue] = useState(null);
  const [lastOperator, setLastOperator] = useState(null);

  // --- 2. ย้าย Helper Functions ทั้งหมดมา ---
  // (ไม่ต้องใช้ updateScreen() เพราะ React จะอัปเดตจอให้เองเมื่อ State เปลี่ยน)
  
  function safeNumber(s) {
    if (s === '' || s === null || s === undefined) return 0;
    return Number(s);
  }

  function roundNumber(n) {
    if (!isFinite(n)) return 'Error';
    let r = Math.round((n + Number.EPSILON) * 1e12) / 1e12;
    let s = String(r);
    if (s.indexOf('.') >= 0) {
      s = s.replace(/\.?0+$/, '');
    }
    return s;
  }

  function performCalculation(op, a, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  // --- 3. ย้าย Event Handlers ทั้งหมดมา (และใช้ set... แทน) ---

  function numberClicked(num) {
    let newDisplay;
    if (waitingForSecond) {
      newDisplay = String(num);
      setWaitingForSecond(false);
    } else {
      if (display === '0') newDisplay = String(num);
      else {
        if (display.replace('-', '').length < 15) newDisplay = display + String(num);
        else return;
      }
    }
    setDisplay(newDisplay);
  }

  function decimalClicked() {
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }

  function ceClicked() {
    setDisplay('0');
    setWaitingForSecond(false);
  }

  function plusMinusClicked() {
    if (display === '0') return;
    if (display.startsWith('-')) setDisplay(display.slice(1));
    else setDisplay('-' + display);
  }

  function percentClicked() {
    const val = safeNumber(display) / 100;
    setDisplay(String(roundNumber(val)));
  }

  function reciprocalClicked() {
    const val = safeNumber(display);
    if (val === 0) {
      setDisplay('Error');
    } else {
      setDisplay(String(roundNumber(1 / val)));
    }
  }

  function operatorClicked(nextOperator) {
    const inputValue = safeNumber(display);

    if (operator && !waitingForSecond) {
      const result = performCalculation(operator, firstValue, inputValue);
      setDisplay(String(roundNumber(result)));
      setFirstValue(result);
    } else {
      setFirstValue(inputValue);
    }

    setWaitingForSecond(true);
    setOperator(nextOperator);
    setLastOperator(nextOperator);
  }

  function equalClicked() {
    const inputValue = safeNumber(display);

    if (operator) {
      const result = performCalculation(operator, firstValue, inputValue);
      setDisplay(String(roundNumber(result)));
      setFirstValue(result);
      setLastSecondValue(inputValue);
      setOperator(null);
      setWaitingForSecond(false);
    } else if (lastSecondValue !== null) {
      const result = performCalculation(lastOperator, firstValue, lastSecondValue);
      setDisplay(String(roundNumber(result)));
      setFirstValue(result);
    }
  }

  // --- 4. แปลง Keyboard Support เป็น useEffect ---
  useEffect(() => {
    function checkKeyboard(event) {
      const k = event.key;
      if (k >= '0' && k <= '9') {
        numberClicked(Number(k));
      } else if (k === '.') {
        decimalClicked();
      } else if (k === '+' || k === '-' || k === '*' || k === '/') {
        operatorClicked(k);
      } else if (k === 'Enter' || k === '=') {
        equalClicked();
      } else if (k === 'Backspace') {
        if (!waitingForSecond && display.length > 1) {
          setDisplay((prev) => prev.slice(0, -1));
        } else {
          setDisplay('0');
        }
      } else if (k === 'Escape' || k === 'c' || k === 'C') {
        ceClicked();
      }
    }
    
    // เพิ่ม Event Listener เมื่อคอมโพเนนต์ถูกสร้าง
    document.addEventListener('keydown', checkKeyboard);
    
    // Cleanup: ลบ Event Listener ออกเมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      document.removeEventListener('keydown', checkKeyboard);
    };
    // ระบุ state ที่ logic นี้ต้องพึ่งพา
  }, [display, firstValue, operator, waitingForSecond, lastOperator, lastSecondValue]);


  // --- 5. แปลง HTML เป็น JSX ---
  return (
    <div className="cal-container" role="application" aria-label="เครื่องคิดเลข">
      {/* แสดงผลจาก State 'display' */}
      <div id="screen" className="cal-screen" aria-live="polite">
        {display}
      </div>

      {/* เปลี่ยน onclick="functionName(arg)" เป็น onClick={() => functionName(arg)} */}
      <div className="row">
        <button className="cal-btn cal-btn-green" id="mc" disabled>MC</button>
        <button className="cal-btn cal-btn-green" id="mr" disabled>MR</button>
        <button className="cal-btn cal-btn-green" id="mplus" disabled>M+</button>
        <button className="cal-btn cal-btn-green" id="mminus" disabled>M-</button>
        <button className="cal-btn cal-btn-red" onClick={ceClicked} aria-label="Clear (CE)">CE</button>
      </div>

      <div className="row">
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(7)}>7</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(8)}>8</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(9)}>9</button>
        <button className="cal-btn cal-btn-green" onClick={() => operatorClicked('/')} aria-label="Divide">÷</button>
        <button className="cal-btn cal-btn-green" onClick={percentClicked} aria-label="Percent">%</button>
      </div>

      <div className="row">
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(4)}>4</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(5)}>5</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(6)}>6</button>
        <button className="cal-btn cal-btn-green" onClick={() => operatorClicked('*')} aria-label="Multiply">×</button>
        <button className="cal-btn cal-btn-green" onClick={reciprocalClicked} aria-label="Reciprocal">1/x</button>
      </div>

      <div className="row">
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(1)}>1</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(2)}>2</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(3)}>3</button>
        <button className="cal-btn cal-btn-green" onClick={() => operatorClicked('-')} aria-label="Minus">−</button>
        <button className="cal-btn cal-btn-green" onClick={plusMinusClicked} aria-label="PlusMinus">±</button>
      </div>

      <div className="row">
        <button className="cal-btn cal-btn-blue wide" onClick={() => numberClicked(0)}>0</button>
        <button className="cal-btn cal-btn-blue" onClick={decimalClicked} aria-label="Decimal">.</button>
        <button className="cal-btn cal-btn-green" onClick={() => operatorClicked('+')} aria-label="Plus">+</button>
        <button id="Equals" className="cal-btn cal-btn-green" onClick={equalClicked} aria-label="Equals">=</button>
      </div>

      {/* ลบ .student div ออก เพราะย้ายไปที่ Header/Home แล้ว */}
    </div>
  );
}

export default PageCalculator;