
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import Parcels from "./pages/Parcels";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ListVehicle from "./pages/ListVehicle";
import AddVehicle from "./pages/AddVehicle";
import PostParcelRequest from "./pages/PostParcelRequest";
import BookVehicle from "./pages/BookVehicle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/parcels" element={<Parcels />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/list-vehicle" element={
              <ProtectedRoute>
                <ListVehicle />
              </ProtectedRoute>
            } />
            <Route path="/add-vehicle" element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            } />
            <Route path="/add-parcel" element={
              <ProtectedRoute>
                <PostParcelRequest />
              </ProtectedRoute>
            } />
            <Route path="/book-vehicle/:vehicleId" element={<BookVehicle />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
