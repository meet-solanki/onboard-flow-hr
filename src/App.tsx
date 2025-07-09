import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ModernHome from "./pages/ModernHome";
import Auth from "./pages/Auth";
import SupabaseDashboard from "./pages/SupabaseDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeOnboarding from "./pages/EmployeeOnboarding";
import AddEmployee from "./pages/AddEmployee";
import Dashboard from "./pages/Dashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import ModernDashboard from "./pages/ModernDashboard";
import ModernAddEmployee from "./pages/ModernAddEmployee";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModernHome />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* New role-based protected routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee-dashboard" 
              element={
                <ProtectedRoute requiredRole="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Existing routes - keeping for backward compatibility */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <SupabaseDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/:id" 
              element={
                <ProtectedRoute>
                  <EmployeeOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-employee" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AddEmployee />
                </ProtectedRoute>
              } 
            />
            <Route path="/old-dashboard" element={<Dashboard />} />
            <Route path="/old-employee/:id" element={<EmployeeProfile />} />
            <Route path="/modern" element={<ModernHome />} />
            <Route path="/modern-dashboard" element={<ModernDashboard />} />
            <Route path="/modern-add-employee" element={<ModernAddEmployee />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
