// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⭐️ เปลี่ยนตรงนี้ ⭐️
// URL ของ Backend (Ass#1) "ที่รันบนเครื่องเรา"
// ... (imports) ...
const LOCAL_API_URL = 'http://localhost:1600'; // 👈 ตรวจสอบตรงนี้

export default defineConfig({
  // ... (plugins) ...
  server: {
    proxy: {
      '/api': {
        target: LOCAL_API_URL, // 👈 และตรงนี้
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})