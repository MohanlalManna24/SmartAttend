import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useGlobalStore from "./store/GlobalStore";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSinginFalse = useGlobalStore((state) => state.setIsSinginFalse);

  useEffect(() => {
    const timer = setInterval(() => {
      const hours = String(new Date().getHours()).padStart(2, "0");
      const minutes = String(new Date().getMinutes()).padStart(2, "0");
      const seconds = String(new Date().getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isActiveStyle = ({ isActive }) => {
    return `bg-gray-200 px-2 rounded-2xl cursor-pointer ${
      isActive ? "bg-gray-100 text-blue-700 border" : "hover:bg-blue-200"
    }`;
  };

  const mobileActiveStyle = ({ isActive }) => {
    return `block px-4 py-3 rounded-lg transition-colors ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar bg-gray-100 text-black shadow-lg shadow-black/20 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-10 py-2">
        {/* Left Container - Logo and Title */}
        <div className="left-container flex gap-2 md:gap-3 items-center">
          <div className="logo bg-blue-600 p-1 rounded">
            <GiGraduateCap className="text-white text-3xl md:text-4xl" />
          </div>
          <div className="title">
            <h1 className="text-xl md:text-3xl text-blue-500 font-bold whitespace-nowrap">
              SmartAttend
            </h1>
          </div>
        </div>

        {/* Middle Container - Desktop Navigation */}
        <div className="middle-container hidden lg:flex gap-10 text-lg">
          <NavLink to="/" className={isActiveStyle}>
            Home
          </NavLink>
          <NavLink to="/students" className={isActiveStyle}>
            Students Zone
          </NavLink>
          <NavLink to="/viewer" className={isActiveStyle}>
            Viewer
          </NavLink>
          <NavLink to="/admin" className={isActiveStyle}>
            Admin
          </NavLink>
        </div>

        {/* Right Container - Clock, Profile, and Mobile Menu Button */}
        <div className="right-container flex gap-3 md:gap-6 items-center">
          <div className="clock hidden md:block">
            <h3 className="text-lg md:text-2xl">{currentTime || "00:00:00"}</h3>
          </div>
          <div className="profile bg-amber-300 rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer">
            <img
              className="rounded-full object-cover w-full h-full"
              src="/vite.svg"
              alt="Profile"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-3xl text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
          <button
            title="LogOut Your Account"
            className="text-red-500 text-2xl bg-orange-100 rounded p-2 cursor-pointer hover:bg-orange-200"
            onClick={() => isSinginFalse()}
          >
            <MdLogout />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-gray-100 border-t border-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2 space-y-2">
          <NavLink to="/" className={mobileActiveStyle} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink
            to="/students"
            className={mobileActiveStyle}
            onClick={closeMenu}
          >
            Students Zone
          </NavLink>
          <NavLink
            to="/viewer"
            className={mobileActiveStyle}
            onClick={closeMenu}
          >
            Viewer
          </NavLink>
          <NavLink
            to="/admin"
            className={mobileActiveStyle}
            onClick={closeMenu}
          >
            Admin
          </NavLink>

          {/* Mobile Clock */}
          <div className="px-4 py-3 text-center text-blue-600 font-semibold">
            {currentTime || "00:00:00"}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
