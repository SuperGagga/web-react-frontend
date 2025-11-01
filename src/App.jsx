// src/App.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// 1. Import "กล่อง" และตัวแปร .env
import ConfigContext from './context/ConfigContext';
const DRONE_ID = import.meta.env.VITE_DRONE_ID;
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // 2. ย้าย State (ที่เก็บข้อมูล) มาไว้ที่นี่
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. (เหมือนเดิม) สั่ง Fetch Config ทันทีที่ App โหลด
  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch(`${API_URL}/configs/${DRONE_ID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConfig(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []); // [] = ทำครั้งเดียว

  return (
    // 4. "ส่งต่อ" ข้อมูล (config, loading, error) ลงไปใน "กล่อง"
    <ConfigContext.Provider value={{ config, loading, error }}>
      <div>
        <header>
          <h1>Drone Dashboard (React Version)</h1>
          <nav>
            <NavLink to="/">Page #1: Config</NavLink>
            <NavLink to="/form">Page #2: Log Form</NavLink>
            <NavLink to="/logs">Page #3: View Logs</NavLink>
          </nav>
        </header>

        <main>
          {/* 5. "ช่องว่าง" (Outlet) จะได้รับข้อมูลจาก "กล่อง" นี้ */}
          <Outlet />
        </main>
      </div>
    </ConfigContext.Provider>
  );
}

export default App;