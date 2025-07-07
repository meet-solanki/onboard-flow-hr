
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, BarChart3, CheckCircle, Users, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { initializeSampleData } from '../utils/storage';

const Home = () => {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Smart HR
              <span className="block text-blue-200">Onboarding System</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Streamline your employee onboarding process with our intelligent system. 
              Automatically generate personalized checklists, track progress in real-time, 
              and ensure every new hire has a smooth start to their journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/add-employee"
                className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add Employee</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/dashboard"
                className="group bg-blue-800 bg-opacity-20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-white border-opacity-20"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Smooth Onboarding
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive system handles every aspect of employee onboarding, 
              from initial setup to completion tracking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Employee Setup</h3>
              <p className="text-gray-600">
                Quickly add new employees with essential information and automatically 
                generate their personalized onboarding checklist.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor each employee's progress through their onboarding journey with 
                real-time updates and completion percentages.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Dashboard</h3>
              <p className="text-gray-600">
                Get a bird's-eye view of all employees and their onboarding status 
                in one centralized, easy-to-use dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Smart HR Onboarding System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
