import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaChartLine,
  FaUserShield,
  FaClock,
  FaCheckCircle,
  FaMobileAlt,
  FaArrowRight,
} from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const Home = () => {
  const features = [
    {
      icon: <FaClock className="text-4xl text-blue-600" />,
      title: "Real-Time Tracking",
      description: "Monitor attendance instantly with live updates and notifications",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-600" />,
      title: "Easy Check-In",
      description: "Students can mark attendance with a single click from anywhere",
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-600" />,
      title: "Analytics & Reports",
      description: "Comprehensive insights with detailed attendance analytics",
    },
    {
      icon: <FaMobileAlt className="text-4xl text-orange-600" />,
      title: "Mobile Friendly",
      description: "Access from any device - desktop, tablet, or smartphone",
    },
  ];

  const stats = [
    { number: "99%", label: "Accuracy Rate" },
    { number: "24/7", label: "Availability" },
    { number: "1000+", label: "Students" },
    { number: "50+", label: "Institutions" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-blue-700">
                  Smart Attendance System
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Simplify Attendance
                <span className="block text-blue-600 mt-2">Management</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Transform the way you track student attendance with our intelligent,
                user-friendly platform. Save time, reduce errors, and gain valuable
                insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/students"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  <FaUserGraduate />
                  Student Zone
                  <FaArrowRight className="text-sm" />
                </Link>

                <Link
                  to="/viewer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all"
                >
                  <FaChartLine />
                  Attendance Viewer
                </Link>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl transform -rotate-6"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <GiGraduateCap className="text-8xl text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      SmartAttend
                    </h3>
                    <p className="text-gray-600">
                      Attendance Made Simple
                    </p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <FaCheckCircle className="text-green-600 text-xl" />
                      <span className="text-sm font-medium text-gray-700">
                        Quick Check-In
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaChartLine className="text-blue-600 text-xl" />
                      <span className="text-sm font-medium text-gray-700">
                        Real-time Analytics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartAttend?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make attendance management effortless
              and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of institutions using SmartAttend for seamless
            attendance management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/students"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
            >
              Get Started Now
              <FaArrowRight />
            </Link>
            <Link
              to="/viewer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all"
            >
              View Attendance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
