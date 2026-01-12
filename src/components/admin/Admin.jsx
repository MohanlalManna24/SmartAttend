import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <Outlet />
    </div>
  )
}

export default Admin
