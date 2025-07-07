
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, Mail, Building2, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getEmployees, getEmployeeProgress, Employee } from '../utils/storage';

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Engineering':
        return 'bg-blue-100 text-blue-800';
      case 'Marketing':
        return 'bg-purple-100 text-purple-800';
      case 'HR':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const getProgressStatus = (progress: number) => {
    if (progress === 100) return { icon: CheckCircle, text: 'Completed', color: 'text-green-600' };
    if (progress > 0) return { icon: Clock, text: 'In Progress', color: 'text-blue-600' };
    return { icon: Clock, text: 'Not Started', color: 'text-gray-500' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
              <p className="text-gray-600">Track onboarding progress for all employees</p>
            </div>
            <Link
              to="/add-employee"
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Users className="w-5 h-5" />
              <span>Add Employee</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => getEmployeeProgress(emp.id) === 100).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => {
                    const progress = getEmployeeProgress(emp.id);
                    return progress > 0 && progress < 100;
                  }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Not Started</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => getEmployeeProgress(emp.id) === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Cards */}
        {employees.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first employee to the system.</p>
            <Link
              to="/add-employee"
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Add First Employee</span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => {
              const progress = getEmployeeProgress(employee.id);
              const status = getProgressStatus(progress);
              const StatusIcon = status.icon;
              
              return (
                <div key={employee.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    {/* Employee Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{employee.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Mail className="w-4 h-4 mr-1" />
                          {employee.email}
                        </div>
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1 text-gray-400" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(employee.department)}`}>
                            {employee.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Onboarding Progress</span>
                        <span className="text-sm font-bold text-gray-900">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className={`flex items-center mt-2 text-sm ${status.color}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {status.text}
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <Link
                      to={`/employee/${employee.id}`}
                      className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Checklist</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
