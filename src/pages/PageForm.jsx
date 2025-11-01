// src/pages/PageForm.jsx
import React, { useState, useContext } from 'react';
import ConfigContext from '../context/ConfigContext'; // 1. Import "กล่อง"

const API_URL = import.meta.env.VITE_API_URL;

function PageForm() {
  // 2. "หยิบ" Config จาก "กล่อง"
  const { config, loading: configLoading, error: configError } = useContext(ConfigContext);

  // 3. สร้าง "ที่เก็บ" (State) สำหรับฟอร์มนี้
  const [celsius, setCelsius] = useState(''); // เก็บค่าที่ User พิมพ์
  const [isSubmitting, setIsSubmitting] = useState(false); // สถานะ (กำลังส่ง)
  const [submitStatus, setSubmitStatus] = useState(null); // ผลลัพธ์ (สำเร็จ/ล้มเหลว)

  // 4. ฟังก์ชันที่จะรันเมื่อกด Submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // กันหน้ารีเฟรช
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 5. "แพ็ค" ข้อมูล 4 field (สำหรับ Backend "Basic")
    const logData = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: parseFloat(celsius),
    };

    // 6. ยิง POST ไปหา Ass#1
    try {
      const response = await fetch(`${API_URL}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }

      await response.json();
      setSubmitStatus({ success: true, message: 'Log created successfully!' });
      setCelsius(''); // ล้างช่องกรอก

    } catch (e) {
      setSubmitStatus({ success: false, message: `Failed to submit: ${e.message}` });
    } finally {
      setIsSubmitting(false); // คืนค่าปุ่ม
    }
  };

  // 7. จัดการ UI ตอน Config ยังโหลดไม่เสร็จ
  if (configLoading) {
    return <div>Loading config, please wait...</div>;
  }
  if (configError) {
    return <div style={{ color: 'red' }}>Error loading config: {configError}</div>;
  }

  // 8. แสดงฟอร์ม (ถ้า Config พร้อมแล้ว)
  return (
    <div>
      <h2>Page #2: Log Form</h2>
      <p>Ready to log for: <strong>{config.drone_name}</strong></p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="celsius-input">Temperature (Celsius):</label>
          <input
            type="number"
            id="celsius-input"
            step="0.1"
            required
            value={celsius} // "คุม" ค่าในช่อง
            onChange={(e) => setCelsius(e.target.value)} // "ดักฟัง" การพิมพ์
            disabled={isSubmitting} // ปิดปุ่มตอนส่ง
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Data'}
        </button>
      </form>

      {/* 9. แสดงผลลัพธ์ (สำเร็จ/ล้มเหลว) */}
      {submitStatus && (
        <div style={{ color: submitStatus.success ? 'green' : 'red', marginTop: '15px' }}>
          {submitStatus.message}
        </div>
      )}
    </div>
  );
}

export default PageForm;