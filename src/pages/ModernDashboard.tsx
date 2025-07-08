
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Calendar, Clock, User, CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import { getEmployees, getEmployeeProgress } from '../utils/storage';

const ModernDashboard = () => {
  const employees = getEmployees();

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
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Smart HR</h1>
            </Link>
            <div className="flex items-center space-x-2 text-white/80">
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
          </div>
          <Link
            to="/add-employee"
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </Link>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{employees.length}</div>
                <div className="text-gray-600">Total Employees</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">
                  {employees.filter(emp => getEmployeeProgress(emp.id) === 100).length}
                </div>
                <div className="text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">
                  {employees.filter(emp => getEmployeeProgress(emp.id) > 0 && getEmployeeProgress(emp.id) < 100).length}
                </div>
                <div className="text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Employee Onboarding</h2>
            <div className="text-gray-600">{employees.length} employees</div>
          </div>

          <div className="space-y-4">
            {employees.map((employee) => {
              const progress = getEmployeeProgress(employee.id);
              return (
                <Link
                  key={employee.id}
                  to={`/employee/${employee.id}`}
                  className="block bg-white/50 rounded-xl p-6 hover:bg-white/70 transition-all duration-200 border border-white/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                        <p className="text-gray-600">{employee.email}</p>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mt-1">
                          {employee.department}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800 mb-1">{progress}%</div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            progress === 100 ? 'bg-green-500' : 
                            progress > 50 ? 'bg-blue-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {progress === 100 ? 'Complete' : 'In Progress'}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {employees.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No employees yet</h3>
                <p className="text-gray-500 mb-6">Start by adding your first employee to begin the onboarding process.</p>
                <Link
                  to="/add-employee"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Employee</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
