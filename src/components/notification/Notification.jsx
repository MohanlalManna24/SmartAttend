import React from 'react'
import useNotificationStore from '../store/useNotificationStore'

const Notification = () => {
    const { show, message, type, isExiting } = useNotificationStore();

  if (!show) return null;

  const typeStyles = {
    success: "bg-emerald-100 border-emerald-300 text-emerald-800",
    warning: "bg-amber-100 border-yellow-500 text-yellow-800",
    error: "bg-red-100 border-red-300 text-red-800",
    info: "bg-blue-100 border-blue-300 text-blue-800",
  };

  return (
    <div className={`fixed top-20 right-6 z-50 ${isExiting ? "animate-slideOut" : "animate-slideIn"}`}>
      <div
        className={`${
          typeStyles[type] || "bg-gray-100 border-gray-300 text-gray-800"
        } px-5 py-3 rounded-xl border-2 shadow-lg backdrop-blur-sm min-w-\[300px] max-w-md`}
      >
        <p className="font-medium text-center">{message}</p>
      </div>
    </div>
  )
}

export default Notification
