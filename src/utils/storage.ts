
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: 'HR' | 'Engineering' | 'Marketing';
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  employeeId: string;
  stepName: string;
  status: 'pending' | 'completed';
  order: number;
}

const EMPLOYEES_KEY = 'hr_employees';
const CHECKLIST_KEY = 'hr_checklist';

const defaultChecklistSteps = [
  'Submit Documents',
  'Attend Orientation',
  'Meet the Team',
  'Set Up Email',
  'Final HR Review'
];

// Employee management
export const getEmployees = (): Employee[] => {
  const stored = localStorage.getItem(EMPLOYEES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveEmployee = (employee: Omit<Employee, 'id' | 'createdAt'>): Employee => {
  const employees = getEmployees();
  const newEmployee: Employee = {
    ...employee,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  employees.push(newEmployee);
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  
  // Auto-create checklist for new employee
  createChecklistForEmployee(newEmployee.id);
  
  return newEmployee;
};

// Checklist management
export const getChecklist = (): ChecklistItem[] => {
  const stored = localStorage.getItem(CHECKLIST_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getEmployeeChecklist = (employeeId: string): ChecklistItem[] => {
  const checklist = getChecklist();
  return checklist.filter(item => item.employeeId === employeeId)
    .sort((a, b) => a.order - b.order);
};

export const createChecklistForEmployee = (employeeId: string): void => {
  const checklist = getChecklist();
  const newItems: ChecklistItem[] = defaultChecklistSteps.map((stepName, index) => ({
    id: `${employeeId}_${index}`,
    employeeId,
    stepName,
    status: 'pending',
    order: index + 1
  }));
  
  const updatedChecklist = [...checklist, ...newItems];
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updatedChecklist));
};

export const updateChecklistItem = (itemId: string, status: 'pending' | 'completed'): void => {
  const checklist = getChecklist();
  const updatedChecklist = checklist.map(item =>
    item.id === itemId ? { ...item, status } : item
  );
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updatedChecklist));
};

export const getEmployeeProgress = (employeeId: string): number => {
  const employeeChecklist = getEmployeeChecklist(employeeId);
  if (employeeChecklist.length === 0) return 0;
  
  const completedItems = employeeChecklist.filter(item => item.status === 'completed').length;
  return Math.round((completedItems / employeeChecklist.length) * 100);
};

// Initialize with sample data
export const initializeSampleData = (): void => {
  const employees = getEmployees();
  if (employees.length === 0) {
    const sampleEmployees = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        department: 'Engineering' as const
      },
      {
        name: 'Mike Chen',
        email: 'mike.chen@company.com',
        department: 'Marketing' as const
      }
    ];
    
    sampleEmployees.forEach(emp => saveEmployee(emp));
    
    // Mark some items as completed for demo
    setTimeout(() => {
      const checklist = getChecklist();
      if (checklist.length > 0) {
        updateChecklistItem(checklist[0].id, 'completed');
        updateChecklistItem(checklist[1].id, 'completed');
        updateChecklistItem(checklist[5].id, 'completed');
      }
    }, 100);
  }
};
