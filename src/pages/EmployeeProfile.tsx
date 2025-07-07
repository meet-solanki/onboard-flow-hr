
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Building2, Calendar, CheckCircle, Circle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getEmployees, getEmployeeChecklist, updateChecklistItem, Employee, ChecklistItem } from '../utils/storage';
import { useToast } from '../hooks/use-toast';

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const employees = getEmployees();
      const foundEmployee = employees.find(emp => emp.id === id);
      setEmployee(foundEmployee || null);
      
      if (foundEmployee) {
        const employeeChecklist = getEmployeeChecklist(id);
        setChecklist(employeeChecklist);
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleStatusToggle = (itemId: string, currentStatus: 'pending' | 'completed') => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    updateChecklistItem(itemId, newStatus);
    
    // Update local state
    setChecklist(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
    
    toast({
      title: newStatus === 'completed' ? "Step Completed!" : "Step Marked as Pending",
      description: `Checklist item has been updated successfully.`
    });
  };

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

  const completedItems = checklist.filter(item => item.status === 'completed').length;
  const totalItems = checklist.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h1>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Employee Header */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-1">{employee.name}</h1>
                <div className="flex items-center space-x-4 text-blue-100">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {employee.email}
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    {employee.department}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {new Date(employee.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Onboarding Progress</h2>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">{progress}%</span>
                <span className="text-gray-500">({completedItems}/{totalItems})</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  progress === 100 ? 'bg-green-500' : 
                  progress >= 60 ? 'bg-blue-500' : 
                  progress >= 30 ? 'bg-yellow-500' : 'bg-gray-300'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {progress === 100 && (
              <div className="flex items-center mt-3 text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Onboarding Complete! 🎉</span>
              </div>
            )}
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Onboarding Checklist</h2>
            <p className="text-gray-600 mt-1">Track progress through each step of the onboarding process</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {checklist.map((item, index) => (
              <div key={item.id} className="px-8 py-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleStatusToggle(item.id, item.status)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        item.status === 'completed'
                          ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {index + 1}
                      </span>
                      <h3 className={`text-lg font-medium transition-colors ${
                        item.status === 'completed' 
                          ? 'text-gray-500 line-through' 
                          : 'text-gray-900'
                      }`}>
                        {item.stepName}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'completed' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
