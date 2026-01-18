import { MdOutlineCancel } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { MdPercent } from "react-icons/md";
import { ImWink } from "react-icons/im";
import useAttendanceStore from "../store/UseAttendanceStore";
import { useEffect, useState } from "react";
import Singin from "../SingIn.jsx";
import useGlobalStore from "../store/GlobalStore";

const StudentsZone = () => {
  const singleStudent = useGlobalStore((state) => state.singleStudent);
  const isSingin = useGlobalStore((state) => state.isSingin);
  const setSingleStudent = useGlobalStore((state) => state.setSingleStudent);
  const fetchStudents = useAttendanceStore((state) => state.fetchStudents);
  const studentsList = useAttendanceStore((state) => state.studentsList);

  useEffect(() => {
    console.log("Single Student Data:", singleStudent);
  }, [singleStudent]);
  // Get current date and time
  const now = new Date();
  const today_date = now.toLocaleDateString("en-GB").replace(/\//g, ".");

  // Calculate tomorrow's date
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tommorow_date = tomorrow
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");

  const handlePresent = async () => {
    try {
      // Get current student data
      const currentStudent = useAttendanceStore.getState().studentsList.find(s => s.id === singleStudent.id);
      const existingAttendance = currentStudent?.attendance || [];
      
      // Check if attendance already exists for tomorrow
      const alreadyMarked = existingAttendance.some(entry => entry.date === tommorow_date);
      
      if (alreadyMarked) {
        alert("Attendance already marked for tomorrow!");
        return;
      }

      // Create attendance object for tomorrow
      const now = new Date();
      const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      const attendanceEntry = {
        status: "present",
        date: tommorow_date,
        time: time
      };
      
      // Append new attendance entry
      const updatedAttendance = [...existingAttendance, attendanceEntry];
      
      await useAttendanceStore
        .getState()
        .updateStudent(singleStudent.id, { 
          attendance: updatedAttendance,
          totalPresent: (currentStudent?.totalPresent || 0) + 1
        });

      // Refresh student data
      await fetchStudents();
      const updatedStudent = useAttendanceStore
        .getState()
        .studentsList.find((s) => s.id === singleStudent.id);
      if (updatedStudent) {
        setSingleStudent(updatedStudent);
      }

      alert("Attendance confirmed for tomorrow!");
    } catch (error) {
      alert(error.message);
    }
  };
  const haldleAbsent = async () => {
    try {
      // Get current student data
      const currentStudent = useAttendanceStore.getState().studentsList.find(s => s.id === singleStudent.id);
      const existingAttendance = currentStudent?.attendance || [];
      
      // Check if attendance already exists for tomorrow
      const alreadyMarked = existingAttendance.some(entry => entry.date === tommorow_date);
      
      if (alreadyMarked) {
        alert("Attendance already marked for tomorrow!");
        return;
      }

      // Create attendance object for tomorrow
      const now = new Date();
      const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      const attendanceEntry = {
        status: "absent",
        date: tommorow_date,
        time: time
      };
      
      // Append new attendance entry
      const updatedAttendance = [...existingAttendance, attendanceEntry];
      
      await useAttendanceStore
        .getState()
        .updateStudent(singleStudent.id, { 
          attendance: updatedAttendance,
          totalAbsent: (currentStudent?.totalAbsent || 0) + 1
        });

      // Refresh student data
      await fetchStudents();
      const updatedStudent = useAttendanceStore
        .getState()
        .studentsList.find((s) => s.id === singleStudent.id);
      if (updatedStudent) {
        setSingleStudent(updatedStudent);
      }

      alert("Absence confirmed for tomorrow!");
    } catch (error) {
      alert(error.message);
    }
  };

  const weeklyAttendance = singleStudent.attendance || [];

  // Get current week's attendance (Sunday to Saturday)
  const getCurrentWeekAttendance = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate last Sunday
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - currentDay);
    lastSunday.setHours(0, 0, 0, 0);

    // Calculate next Saturday (end of current week)
    const nextSaturday = new Date(lastSunday);
    nextSaturday.setDate(lastSunday.getDate() + 6); // 6 days after Sunday = Saturday
    nextSaturday.setHours(23, 59, 59, 999);

    // Filter attendance from last Sunday to next Saturday (complete week)
    const currentWeekData = weeklyAttendance.filter((entry) => {
      const [day, month, year] = entry.date.split(".");
      const entryDate = new Date(`${year}-${month}-${day}`);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate >= lastSunday && entryDate <= nextSaturday;
    });

    // Sort by date
    return currentWeekData.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split(".");
      const [dayB, monthB, yearB] = b.date.split(".");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateA - dateB;
    });
  };

  const currentWeekAttendance = getCurrentWeekAttendance();

  if (!isSingin) {
    return <Singin />;
  }
  return (
    <div className="studentsZone container mx-auto px-4 py-3 min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      {/* Welcome Header Card */}
      <div className="info m-5">
        <h1 className="text-center text-4xl font-bold pb-4 animate-fade-in">
          Welcome, {singleStudent.fullName}! 👋
        </h1>
        <p className="text-center text-lg text-blue-100 font-light">
          <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <b className="text-black">Roll Number:</b>
            <span className="ml-2 text-blue-800">
              {singleStudent.rollNumber}
            </span>
          </span>
          <span className="mx-3 text-blue-400">●</span>
          <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <b className="text-black">Registration Number:</b>
            <span className="ml-2 text-blue-800">
              {singleStudent.registrationNumber}
            </span>
          </span>
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="AttendanceProcess bg-white border border-gray-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-2/3 transform hover:-translate-y-1">
          {/* Tomorrow's Confirmation Card */}
          <div className="m-8 mt-0 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-indigo-100 shadow-lg hover:shadow-2xl transition-all duration-300 sm:w-3/4 lg:w-2/3 mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-1 h-10 bg-linear-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
                  Attendance Confirmation
                </h2>
                <div className="w-1 h-10 bg-linear-to-b from-purple-600 to-indigo-500 rounded-full"></div>
              </div>

              <div className="mb-6 text-center">
                <p className="text-gray-700 text-lg font-medium mb-1">
                  Please confirm your attendance for tomorrow
                </p>
                <p className="text-sm text-gray-500 bg-white/60 px-4 py-2 rounded-full inline-block backdrop-blur-sm">
                  📅 {tommorow_date}
                </p>
              </div>

              <div className="options flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-2xl">
                <button
                  className="group relative flex-1 px-4 sm:px-6 py-4 sm:py-5 cursor-pointer bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-base sm:text-lg overflow-hidden border-2 border-green-400/50"
                  onClick={handlePresent}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                    <FaRegCircleCheck className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                    <span className="flex flex-col items-start">
                      <span className="text-base sm:text-xl">Will Attend</span>
                      <span className="text-xs text-green-100 font-normal">
                        I'll be present tomorrow
                      </span>
                    </span>
                  </span>
                </button>

                <button
                  className="group relative flex-1 px-4 sm:px-6 py-4 sm:py-5 cursor-pointer bg-linear-to-r from-red-500 to-rose-600 text-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-base sm:text-lg overflow-hidden border-2 border-red-400/50"
                  onClick={haldleAbsent}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                    <MdOutlineCancel className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                    <span className="flex flex-col items-start">
                      <span className="text-base sm:text-xl">
                        Will Not Attend
                      </span>
                      <span className="text-xs text-red-100 font-normal">
                        I'll be absent tomorrow
                      </span>
                    </span>
                  </span>
                </button>
              </div>

              <p className="mt-6 text-xs text-gray-500 text-center max-w-md">
                💡 Your confirmation helps us plan better. Please submit before
                11:59 PM tonight.
              </p>
            </div>
          </div>
          {/* Weekly Attendance Process */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Weekly Attendance Process
            </h2>
          </div>

          <div className="weeklyProcess grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {currentWeekAttendance.map((entry, index) => {
              const dayNames = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              const entryDate = new Date(
                entry.date.split(".").reverse().join("-")
              );
              const dayName = dayNames[entryDate.getDay()];
              return (
                <div
                  key={index}
                  className={`day flex flex-col gap-3 justify-center items-center p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group border-2 border-transparent ${
                    entry.status === "present"
                      ? "bg-linear-to-br from-green-50 to-green-100 hover:border-green-300"
                      : entry.status === "absent"
                      ? "bg-linear-to-br from-red-50 to-red-100 hover:border-red-300"
                      : "bg-linear-to-br from-blue-50 to-blue-100 hover:border-blue-300"
                  }`}
                >
                  <h3 className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {dayName}
                  </h3>
                  <span
                    className={`p-3 rounded-full transition-all duration-300 group-hover:rotate-12 ${
                      entry.status === "present"
                        ? "bg-green-100 group-hover:bg-green-200"
                        : entry.status === "absent"
                        ? "bg-red-100 group-hover:bg-red-200"
                        : "bg-blue-100 group-hover:bg-blue-200"
                    }`}
                  >
                    {entry.status === "present" ? (
                      <FaRegCircleCheck className="text-green-500 text-3xl group-hover:scale-110 transition-transform" />
                    ) : entry.status === "absent" ? (
                      <MdOutlineCancel className="text-red-500 text-3xl group-hover:scale-110 transition-transform" />
                    ) : (
                      <ImWink className="text-blue-500 text-3xl group-hover:scale-110 transition-transform" />
                    )}
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      entry.status === "present"
                        ? "text-green-600"
                        : entry.status === "absent"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {entry.status.charAt(0).toUpperCase() +
                      entry.status.slice(1)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="attendanceSummary bg-white border border-gray-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-1/3 transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-linear-to-b from-purple-500 to-pink-600 rounded-full"></div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Attendance Summary
            </h2>
          </div>

          {/* Overall Percentage Card */}
          <div className="flex items-center gap-4 mt-5 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-purple-300">
            <span className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-all duration-300 group-hover:rotate-12">
              <MdPercent className="text-purple-600 text-2xl group-hover:scale-110 transition-transform" />
            </span>
            <span className="flex-1 font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
              Overall Percentage
            </span>
            <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              90%
            </span>
          </div>

          {/* Total Present Card */}
          <div className="flex items-center gap-4 mt-4 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-green-300">
            <span className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-all duration-300 group-hover:rotate-12">
              <FaRegCircleCheck className="text-green-600 text-2xl group-hover:scale-110 transition-transform" />
            </span>
            <span className="flex-1 font-medium text-gray-700 group-hover:text-green-600 transition-colors">
              Total Present
            </span>
            <span className="text-2xl font-bold text-green-600">20</span>
          </div>

          {/* Total Absent Card */}
          <div className="flex items-center gap-4 mt-4 p-4 bg-linear-to-r from-red-50 to-rose-50 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-red-300">
            <span className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition-all duration-300 group-hover:rotate-12">
              <ImCancelCircle className="text-red-600 text-2xl group-hover:scale-110 transition-transform" />
            </span>
            <span className="flex-1 font-medium text-gray-700 group-hover:text-red-600 transition-colors">
              Total Absent
            </span>
            <span className="text-2xl font-bold text-red-600">10</span>
          </div>

          {/* Academic Overview - CGPA Section */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-linear-to-b from-indigo-500 to-blue-600 rounded-full"></div>
              <h2 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Academic Overview - CGPA
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
              {/* 1st Semester */}
              <div className="cgpaCard group relative bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-300 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    10
                  </span>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
                    1ST SEM
                    
                  </p>
                </div>
              </div>

              {/* 2nd Semester */}
              <div className="cgpaCard group relative bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-500/0 to-teal-500/0 group-hover:from-green-500/10 group-hover:to-teal-500/10 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    9
                  </span>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">
                    2<sup className="text-xs">ND</sup> SEM
                  </p>
                </div>
              </div>

              {/* 3rd Semester */}
              <div className="cgpaCard group relative bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-300 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    10
                  </span>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors">
                    3<sup className="text-xs">RD</sup> SEM
                  </p>
                </div>
              </div>

              {/* 4th Semester */}
              <div className="cgpaCard group relative bg-linear-to-br from-pink-50 via-rose-50 to-red-50 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-pink-300 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-pink-500/0 to-rose-500/0 group-hover:from-pink-500/10 group-hover:to-rose-500/10 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl font-bold bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    10
                  </span>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-pink-600 transition-colors">
                    4<sup className="text-xs">TH</sup> SEM
                  </p>
                </div>
              </div>

              {/* 5th Semester */}
              <div className="cgpaCard group relative bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-violet-300 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    10
                  </span>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-violet-600 transition-colors">
                    5<sup className="text-xs">TH</sup> SEM
                  </p>
                </div>
              </div>
              

              {/* Overall CGPA - Highlighted */}
              <div className="cgpaCard group relative bg-linear-to-br from-cyan-50 via-sky-50 to-blue-50 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-cyan-300 hover:border-cyan-400 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    9.8
                  </span>
                  <p className="text-sm font-semibold text-cyan-700 group-hover:text-cyan-600 transition-colors">
                    OVERALL
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StudentsZone;
