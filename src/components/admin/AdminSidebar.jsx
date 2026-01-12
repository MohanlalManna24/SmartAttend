import { FaList } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { IoMdPower } from "react-icons/io";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const isActiveStyle = ({isActive})=>{
    return isActive ? 'bg-blue-700' : 'hover:bg-blue-700';  
  }
  return (
    <div>
      {/* Sidebar */}
      <div className="side-bar bg-linear-to-b from-blue-500 to-blue-600 w-64 h-screen sticky top-0 shadow-xl">
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold mb-8 text-center">
          ✪ Admin Panel ✪ 
          </h2>
          <ul className="space-y-2">
            <li className="hover:translate-x-2 transition-transform duration-300">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `flex items-center text-white p-3 rounded-lg transition-colors duration-300 ${
                    isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                  }`
                }
              >
                <FaList className="mr-3 text-xl" />
                <span className="font-medium">Records</span>
              </NavLink>
            </li>
            <li className="hover:translate-x-2 transition-transform duration-300">
              <NavLink
                to="/admin/students"
                className={({ isActive }) =>
                  `flex items-center text-white p-3 rounded-lg transition-colors duration-300 ${
                    isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                  }`
                }
              >
                <FaUserTie className="mr-3 text-xl" />
                <span className="font-medium">Students</span>
              </NavLink>
            </li>
          </ul>
          <div className="mt-20">
            <button className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center font-medium">
              <IoMdPower className="mr-2 text-xl" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
