
// src/pages/PageConfig.jsx
import React, { useContext } from 'react'; // 1. (ใหม่) Import useContext
import ConfigContext from '../context/ConfigContext'; // 2. (ใหม่) Import "กล่อง"

function PageConfig() {
  // 3. "หยิบ" ของจาก "กล่อง" (Context)
  const { config, loading, error } = useContext(ConfigContext);

  // 4. (เหมือนเดิม) สร้าง UI ตามสถานะ
  if (loading) {
    return <div>Loading Config...</div>;
  }
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  if (!config) {
    return <div>Config not found.</div>;
  }

  // 5. แสดงผล (ถ้าสำเร็จ)
  return (
    <div>
      <h2>Page #1: Drone Config</h2>
      <div id="config-data">
        <p><strong>Drone ID:</strong> {config.drone_id}</p>
        <p><strong>Drone Name:</strong> {config.drone_name}</p>
        <p><strong>Light:</strong> {config.light}</p>
        <p><strong>Country:</strong> {config.country}</p>
      </div>
    </div>
  );
}

export default PageConfig;