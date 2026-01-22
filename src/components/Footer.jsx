import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text- w-screen py-6 mt-auto">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-600">Attendance Confirmation System</h3>
            <p className="text-gray-400 text-sm mt-1">Streamline your attendance tracking</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Developed with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
