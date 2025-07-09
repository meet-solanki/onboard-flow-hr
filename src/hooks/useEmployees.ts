
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  join_date: string;
  created_by: string;
  created_at: string;
}

export interface OnboardingTask {
  id: string;
  employee_id: string;
  task_name: string;
  status: 'pending' | 'in_progress' | 'completed';
  updated_at: string;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
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

  const addEmployee = async (employeeData: Pick<Employee, 'name' | 'email' | 'role'>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add employees",
        variant: "destructive"
      });
      return { data: null, error: new Error('Not authenticated') };
    }

    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          ...employeeData,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Create default onboarding tasks
      const defaultTasks = [
        'Complete HR Documentation',
        'Setup Workspace and Equipment',
        'IT Account Setup',
        'Team Introduction',
        'Company Policy Review',
        'Role-specific Training',
        'Security and Access Cards',
        'Benefits Enrollment'
      ];

      const taskPromises = defaultTasks.map(task => 
        supabase.from('onboarding_progress').insert([{
          employee_id: data.id,
          task_name: task,
          status: 'pending'
        }])
      );

      await Promise.all(taskPromises);

      toast({
        title: "Success",
        description: "Employee added successfully with onboarding tasks created"
      });
      
      fetchEmployees();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Employee updated successfully"
      });
      
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Employee deleted successfully"
      });
      
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    refetch: fetchEmployees
  };
};
