// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

// 1. Import เครื่องมือ Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 2. Import CSS หลัก
import './index.css'

// 3. Import "Layout" หลัก และ "หน้า" ทั้ง 3
import App from './App.jsx' // นี่คือ Layout (เดี๋ยวเราจะไปแก้)
import PageConfig from './pages/PageConfig.jsx'
import PageForm from './pages/PageForm.jsx'
import PageLogs from './pages/PageLogs.jsx'

// 4. สร้าง "แผนที่" (Router)
const router = createBrowserRouter([
  {
    path: '/',        // ที่ URL หลัก ("/")
    element: <App />, // ให้โหลด <App> (Layout ที่มีเมนู)
    children: [
      // "ลูกๆ" ที่จะแสดงใน Layout
      {
        index: true, // ถ้าเป็น "/" พอดี
        element: <PageConfig /> // ให้แสดง Page #1
      },
      {
        path: '/form', // ถ้าเป็น "/form"
        element: <PageForm /> // ให้แสดง Page #2
      },
      {
        path: '/logs', // ถ้าเป็น "/logs"
        element: <PageLogs /> // ให้แสดง Page #3
      }
    ]
  }
])

// 5. สั่งให้ React "รัน" โดยใช้ Router นี้
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)