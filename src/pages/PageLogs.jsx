// src/pages/PageLogs.jsx
import React, { useState, useEffect } from 'react';

// 1. Import ตัวแปร .env
const DRONE_ID = import.meta.env.VITE_DRONE_ID;
const API_URL = import.meta.env.VITE_API_URL;

function PageLogs() {
  // 2. สร้าง "ที่เก็บ" (State)
  const [logs, setLogs] = useState([]); // (1) ข้อมูล Log (เริ่มที่ Array ว่าง)
  const [loading, setLoading] = useState(true); // (2) สถานะ Loading
  const [error, setError] = useState(null); // (3) สถานะ Error
  const [page, setPage] = useState(1); // (4) ⭐️ หน้าปัจจุบัน (เริ่มที่ 1)
  const [isLastPage, setIsLastPage] = useState(false); // (5) ⭐️ เช็คว่าเป็นหน้าสุดท้าย

  // 3. (สำคัญ) สั่งให้ "ทำงาน"
  //    useEffect นี้จะ "ทำงานใหม่" ทุกครั้งที่ค่า [page] (ในวงเล็บข้างล่าง) เปลี่ยน
  useEffect(() => {
    async function fetchLogs() {
      setLoading(true); // เริ่มโหลด
      setError(null);

      try {
        // 4. เรียก Ass#1 (Endpoint ที่มี Pagination)
        const url = `${API_URL}/logs/${DRONE_ID}?page=${page}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setLogs(data); // "เก็บ" Log ที่ได้

        // 5. ⭐️ (ตรรกะ Pagination) เช็คว่านี่คือหน้าสุดท้ายหรือยัง
        //    (ถ้าข้อมูลที่ได้มาน้อยกว่า 12 = หน้าสุดท้าย)
        if (data.length < 12) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }

      } catch (e) {
        setError(e.message);
        setLogs([]); // ล้างข้อมูลเก่าถ้า Error
      } finally {
        setLoading(false); // หยุดโหลด
      }
    }

    fetchLogs(); // เรียกใช้ฟังก์ชัน

  }, [page]); // ⭐️ [page] = "Run This Effect Again If 'page' Changes"

  // 6. ฟังก์ชันสำหรับปุ่ม
  const handleNextPage = () => {
    setPage(currentPage => currentPage + 1); // สั่งให้ "page" + 1 (useEffect จะทำงานใหม่)
  };
  const handlePrevPage = () => {
    setPage(currentPage => currentPage - 1); // สั่งให้ "page" - 1 (useEffect จะทำงานใหม่)
  };

  // 7. สร้างหน้าตา (UI)
  return (
    <div>
      <h2>Page #3: View Logs (12 per page)</h2>

      {/* 7.1) ส่วนควบคุม Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1 || loading}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={isLastPage || loading}>
          Next
        </button>
      </div>

      {/* 7.2) ตารางแสดงผล */}
      <table id="logs-table">
        <thead>
          <tr>
            <th>Created (เวลา)</th>
            <th>Country</th>
            <th>Drone ID</th>
            <th>Drone Name</th>
            <th>Celsius (อุณหภูมิ)</th>
          </tr>
        </thead>
        <tbody>
          {/* 7.3) (สำคัญ) UI ตามสถานะ */}
          {loading && (
            <tr>
              <td colSpan="5">Loading logs...</td>
            </tr>
          )}

          {error && (
            <tr>
              <td colSpan="5" style={{ color: 'red' }}>Error: {error}</td>
            </tr>
          )}

          {!loading && !error && logs.length === 0 && (
            <tr>
              <td colSpan="5">No logs found.</td>
            </tr>
          )}

          {/* 7.4) (⭐️ หัวใจ ⭐️) วนลูป (map) ข้อมูล Log มาสร้างแถว <tr> */}
          {!loading && !error && logs.map(log => (
            <tr key={log.created}> {/* (React ต้องมี "key" ที่ไม่ซ้ำกัน) */}
              <td>{new Date(log.created).toLocaleString('th-TH')}</td>
              <td>{log.country}</td>
              <td>{log.drone_id}</td>
              <td>{log.drone_name}</td>
              <td>{log.celsius.toFixed(1)} °C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PageLogs;