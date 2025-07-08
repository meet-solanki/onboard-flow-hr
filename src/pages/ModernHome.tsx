
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Calendar, Clock, User, CheckCircle } from 'lucide-react';

const ModernHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-300/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Smart HR</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
            <Link to="/add-employee" className="text-white/80 hover:text-white transition-colors">Add Employee</Link>
            <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link>
          </nav>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                HR, Payroll,<br />
                Project, Accounts<br />
                & Employee
              </h2>
              <p className="text-xl text-white/80 mb-4">Management System</p>
              <p className="text-lg text-white/70 mb-8">Ionic Mobile App Template</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 text-lg">React & Ionic</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/add-employee"
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 text-center"
              >
                Add Employee
              </Link>
              <Link
                to="/dashboard"
                className="bg-blue-600/80 backdrop-blur-sm border border-blue-400/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 text-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative">
            {/* Employee Status Card */}
            <div className="absolute top-0 right-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 w-64">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Employees</h3>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded ${i % 3 === 0 ? 'bg-red-200' : i % 4 === 0 ? 'bg-green-200' : 'bg-gray-100'}`}></div>
                ))}
              </div>
            </div>

            {/* Projects Card */}
            <div className="absolute top-32 left-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 w-48">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">140</div>
              <div className="text-gray-600">Projects</div>
            </div>

            {/* Employee Count Card */}
            <div className="absolute bottom-32 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 w-48">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">14</div>
              <div className="text-gray-600">Employees</div>
            </div>

            {/* Task Notifications */}
            <div className="absolute top-64 left-16 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20 w-72">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Appointment booking with p...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-700">Patient appointment booking</span>
                </div>
              </div>
            </div>

            {/* Time Tracking Card */}
            <div className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Time Tracking</h3>
                <div className="w-8 h-8 bg-blue-500 rounded-full">
                  <User className="w-4 h-4 text-white m-2" />
                </div>
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Punch In</span>
                    </div>
                    <span className="text-gray-500">10:00:00 AM</span>
                  </div>
                ))}
                <div className="text-orange-500 text-sm font-medium">06:00:00 hours</div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="absolute top-16 right-32 bg-blue-600 text-white rounded-2xl p-6 shadow-2xl w-64">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-1 bg-white rounded"></div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold">New HR</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-white font-medium">John Doe</div>
                  <div className="text-blue-200 text-sm">Android Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHome;
