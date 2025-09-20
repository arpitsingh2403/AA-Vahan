
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleManageModal from "@/components/VehicleManageModal";
import VehicleBookingsModal from "@/components/VehicleBookingsModal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  Car, 
  Package, 
  Plus, 
  Settings, 
  Eye,
  MapPin, 
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

interface Vehicle {
  id: string;
  type: string;
  brand: string;
  model: string;
  price_per_hour: number;
  location: string;
  image_url: string | null;
  is_available: boolean;
  owner_id: string;
  number_plate: string;
  created_at: string;
}

interface Booking {
  id: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalBookings: 0,
    totalEarnings: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      await Promise.all([
        fetchUserVehicles(),
        fetchUserBookings()
      ]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setVehicles(data || []);
      
      // Update stats
      const totalVehicles = data?.length || 0;
      const availableVehicles = data?.filter(v => v.is_available).length || 0;
      
      setStats(prev => ({
        ...prev,
        totalVehicles,
        availableVehicles
      }));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch your vehicles",
        variant: "destructive",
      });
    }
  };

  const fetchUserBookings = async () => {
    try {
      // Fetch bookings for vehicles owned by the user
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .in('vehicle_id', vehicles.map(v => v.id))
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setBookings(data || []);
      
      // Calculate total earnings and bookings
      const totalBookings = data?.length || 0;
      const totalEarnings = data?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;
      
      setStats(prev => ({
        ...prev,
        totalBookings,
        totalEarnings
      }));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    }
  };

  const handleManageVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsManageModalOpen(true);
  };

  const handleVehicleUpdate = () => {
    fetchUserVehicles();
  };

  const handleBookingComplete = () => {
    fetchUserData();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">You need to be logged in to access the dashboard.</p>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Navbar />
      
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Manage your vehicles and track your earnings.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalVehicles}</p>
                  </div>
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-green-600">{stats.availableVehicles}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalBookings}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-orange-600">₹{stats.totalEarnings}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link to="/list-vehicle">
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                <Plus className="w-5 h-5 mr-2" />
                Add New Vehicle
              </Button>
            </Link>
            
            <Button 
              onClick={() => setIsBookingsModalOpen(true)}
              variant="outline" 
              className="w-full h-12 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Active Bookings
            </Button>
            
            <Link to="/add-parcel">
              <Button 
                variant="outline" 
                className="w-full h-12 border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                <Package className="w-5 h-5 mr-2" />
                Send Parcel
              </Button>
            </Link>
          </div>

          {/* My Vehicles */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                My Vehicles ({vehicles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicles.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">You haven't listed any vehicles yet</p>
                  <Link to="/list-vehicle">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Vehicle
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={vehicle.image_url || `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=200`}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge 
                          className={`absolute top-2 right-2 ${
                            vehicle.is_available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {vehicle.is_available ? 'Available' : 'Booked'}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600 capitalize mb-2">
                          {vehicle.type} • {vehicle.number_plate}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vehicle.location}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-600">
                            ₹{vehicle.price_per_hour}/hr
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleManageVehicle(vehicle)}
                          >
                            <Settings className="w-4 h-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {selectedVehicle && (
        <VehicleManageModal
          vehicle={selectedVehicle}
          isOpen={isManageModalOpen}
          onClose={() => {
            setIsManageModalOpen(false);
            setSelectedVehicle(null);
          }}
          onUpdate={handleVehicleUpdate}
        />
      )}

      <VehicleBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
