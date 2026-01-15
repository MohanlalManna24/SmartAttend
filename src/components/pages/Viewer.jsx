import React, { useState, useEffect } from "react";
import { FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import useAttendanceStore from "../store/UseAttendanceStore";

const Viewer = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const studentsList = useAttendanceStore((state) => state.studentsList);
  const fetchStudents = useAttendanceStore((state) => state.fetchStudents);

  useEffect(() => {
    fetchStudents();
    // Set today's date as default
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, [fetchStudents]);

  // Get today's date 
  const getTodayDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-GB").replace(/\//g, ".");
  };

  // Convert selected date to the format used in attendance (dd.mm.yyyy)
  const getFormattedDate = (dateString) => {
    if (!dateString) return getTodayDate();
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
  };

  const formattedSelectedDate = getFormattedDate(selectedDate);

  // Filter students based on selected date's attendance
  const getAttendanceData = () => {
    return studentsList.map((student) => {
      const selectedDateAttendance = student.attendance?.find(
        (att) => att.date === formattedSelectedDate
      );

      return {
        ...student,
        todayStatus: selectedDateAttendance?.status || "pending",
        checkInTime: selectedDateAttendance?.status === "present" ? selectedDateAttendance.time : selectedDateAttendance?.status === "absent" ? selectedDateAttendance.time : "--:--",
      };
    });
  };

  const attendanceData = getAttendanceData();

  // Calculate statistics
  const totalStudents = attendanceData.length;
  const presentCount = attendanceData.filter(
    (student) => student.todayStatus === "present"
  ).length;
  const pendingCount = attendanceData.filter(
    (student) => student.todayStatus === "pending" || student.todayStatus === "absent"
  ).length;

  return (
    <div className="viewer-container min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Attendance Monitor
          </h1>

          {/* Filters by using date */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Total Students */}
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total</p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalStudents}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          {/* Present */}
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Present
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {presentCount}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-gray-600">
                  {pendingCount}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <FaClock className="text-gray-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 hidden sm:table-cell">
                    Student ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 hidden sm:table-cell">
                    Check-in Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                    Status
                  </th>
                   <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceData.length > 0 ? (
                  attendanceData.map((student, index) => (
                    <tr
                      key={student.id}
                      className="even:bg-gray-100 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-800  ">
                        {student.fullName}
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                        {student.checkInTime}
                      </td>
                      <td className="px-6 py-4">
                        {student.todayStatus === "present" ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Present
                          </span>
                        ) :student.todayStatus === "absent" ?(
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">Absent</span>
                        ) :(
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            Pending
                          </span>
                        )}
                      </td>
                       <td className="px-6 py-4 text-center text-gray-600 hidden sm:table-cell">
                        <div className="flex items-center justify-center gap-5">
                          <IoLogoWhatsapp className="text-green-600 text-2xl cursor-pointer transition-transform hover:scale-130" />
                          <FiPhoneCall className="text-blue-900 text-2xl ml-4 cursor-pointer transition-transform hover:scale-120" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No attendance data available for the selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
