
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { OnboardingTask } from './useEmployees';

export const useOnboarding = (employeeId?: string) => {
  const [tasks, setTasks] = useState<OnboardingTask[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTasks = async (empId?: string) => {
    if (!empId && !employeeId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('onboarding_progress')
        .select('*')
        .eq('employee_id', empId || employeeId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: 'pending' | 'in_progress' | 'completed') => {
    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .update({ status })
        .eq('id', taskId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Task marked as ${status}`
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const addTask = async (employeeId: string, taskName: string) => {
    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .insert([{
          employee_id: employeeId,
          task_name: taskName,
          status: 'pending'
        }]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Task added successfully"
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchTasks();
    }
  }, [employeeId]);

  return {
    tasks,
    loading,
    updateTaskStatus,
    addTask,
    deleteTask,
    refetch: fetchTasks
  };
};
