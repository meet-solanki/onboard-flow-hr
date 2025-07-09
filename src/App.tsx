
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ModernHome from "./pages/ModernHome";
import Auth from "./pages/Auth";
import SupabaseDashboard from "./pages/SupabaseDashboard";
import EmployeeOnboarding from "./pages/EmployeeOnboarding";
import AddEmployee from "./pages/AddEmployee";
import Dashboard from "./pages/Dashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import ModernDashboard from "./pages/ModernDashboard";
import ModernAddEmployee from "./pages/ModernAddEmployee";
import NotFound from "./pages/NotFound";

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
            <Route path="/dashboard" element={<SupabaseDashboard />} />
            <Route path="/employee/:id" element={<EmployeeOnboarding />} />
            <Route path="/add-employee" element={<AddEmployee />} />
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
