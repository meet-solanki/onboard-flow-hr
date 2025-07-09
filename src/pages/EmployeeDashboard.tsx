
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LogOut, CheckCircle2, Clock, AlertCircle, User } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const EmployeeDashboard = () => {
  const { user, userProfile, signOut, loading: authLoading } = useAuth();
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const { tasks, loading: tasksLoading, updateTaskStatus } = useOnboarding(employeeId || undefined);

  useEffect(() => {
    // Find the employee record that matches the current user's email
    const fetchEmployeeId = async () => {
      if (user?.email) {
        const { data, error } = await supabase
          .from('employees')
          .select('id')
          .eq('email', user.email)
          .single();
        
        if (data && !error) {
          setEmployeeId(data.id);
        }
      }
    };

    if (user?.email) {
      fetchEmployeeId();
    }
  }, [user?.email]);

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect if admin
  if (userProfile && userProfile.role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'in_progress':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">My Onboarding</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="font-medium">{userProfile?.name}</span>
                <Badge variant="secondary" className="ml-2">
                  Employee
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Onboarding Progress</CardTitle>
            <CardDescription>
              Complete all tasks to finish your onboarding process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {completedTasks} of {totalTasks} tasks completed
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
              {progressPercentage === 100 && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Congratulations! Onboarding completed!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Tasks</CardTitle>
            <CardDescription>
              Click on tasks to update their status as you complete them
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <div className="text-center py-8">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks assigned yet</h3>
                <p className="text-gray-500">Contact your HR administrator to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => {
                  const StatusIcon = getTaskStatusIcon(task.status);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`w-5 h-5 ${getTaskStatusColor(task.status)}`} />
                        <div>
                          <h4 className="font-medium text-gray-900">{task.task_name}</h4>
                          <p className="text-sm text-gray-500">
                            Status: {task.status.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {task.status !== 'completed' && (
                          <>
                            {task.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTaskStatus(task.id, 'in_progress')}
                              >
                                Start
                              </Button>
                            )}
                            <Button
                              size="sm"
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                            >
                              Mark Complete
                            </Button>
                          </>
                        )}
                        {task.status === 'completed' && (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
