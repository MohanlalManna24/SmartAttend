import React from "react";
import { RiExportFill } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel ,MdEditSquare} from "react-icons/md";
import useAttendanceStore from "../store/UseAttendanceStore";
import Loader from "../loader/Loader";


const Records = () => {
  const { studentsList, loading } = useAttendanceStore();

  if (loading) {
    return (
      <div className="flex-1 w-full mt-20 overflow-auto flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-auto">
      <div className="p-8 w-full max-w-full">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white hover:bg-amber-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-xl p-6 shadow-lg border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2">
                  TOTAL STUDENTS
                </p>
                <h1 className="text-4xl font-bold text-gray-800">
                  {studentsList.length}
                </h1>
              </div>
              <div className="text-5xl text-amber-500">
                <HiUsers />
              </div>
            </div>
          </div>

          <div className="bg-white hover:bg-green-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2">
                  PRESENT TODAY
                </p>
                <h1 className="text-4xl font-bold text-gray-800">120</h1>
              </div>
              <div className="text-5xl text-green-500">
                <IoCheckmarkDoneCircle />
              </div>
            </div>
          </div>

          <div className="bg-white hover:bg-red-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2">
                  ABSENT TODAY
                </p>
                <h1 className="text-4xl font-bold text-gray-800">30</h1>
              </div>
              <div className="text-5xl text-red-500">
                <MdCancel />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Attendance Status
            </h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="search"
                placeholder="🔎 Search student..."
                className="flex-1 sm:flex-none sm:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                title="Export"
              >
                <RiExportFill className="text-xl" />
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                title="Filter"
              >
                <FaFilter className="text-xl" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-98 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-linear-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
                <tr className="bg-linear-to-r from-blue-500 to-blue-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Sl No.</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Roll No</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Check-in Time
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {studentsList.map((items, index) => {
                  const initials = items.name
                    ? items.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "NA";
                  return (
                    <tr
                      key={items.id || index}
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-linear-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {items.profileUrl ? (
                              <img
                                src={items.profileUrl}
                                alt={items.fullName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              initials
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {items.fullName || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {items.email || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {items.rollNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                         {items.attendance?.[2]?.status || "N/A"}

                      </td>
                      <td className="px-6 py-4">
                        {items.attendance?.[2]?.time || "00:00"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="bg-violet-500 text-white px-2 py-2 rounded-lg hover:bg-violet-800 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 mr-2 cursor-pointer"
                        >
                          <MdEditSquare className="text-lg" />
                        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
