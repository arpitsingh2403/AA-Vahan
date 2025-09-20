
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Star, Car, Bike, Truck, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

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
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vehicles, searchLocation, vehicleType, priceRange]);

  const fetchVehicles = async () => {
    try {
      // Only fetch vehicles from other users that are available
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true)
        .neq('owner_id', user?.id || ''); // Exclude current user's vehicles

      if (error) throw error;
      setVehicles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch vehicles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = vehicles;

    // Filter by location
    if (searchLocation) {
      filtered = filtered.filter(vehicle =>
        vehicle.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filter by vehicle type
    if (vehicleType !== "all") {
      filtered = filtered.filter(vehicle => vehicle.type === vehicleType);
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "0-500":
          filtered = filtered.filter(vehicle => vehicle.price_per_hour <= 500);
          break;
        case "500-1000":
          filtered = filtered.filter(vehicle => vehicle.price_per_hour > 500 && vehicle.price_per_hour <= 1000);
          break;
        case "1000+":
          filtered = filtered.filter(vehicle => vehicle.price_per_hour > 1000);
          break;
      }
    }

    setFilteredVehicles(filtered);
  };

  const clearFilters = () => {
    setSearchLocation("");
    setVehicleType("all");
    setPriceRange("all");
  };

  const getVehicleIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'car':
        return <Car className="w-5 h-5" />;
      case 'bike':
        return <Bike className="w-5 h-5" />;
      case 'scooty':
        return <Bike className="w-5 h-5" />;
      case 'auto':
        return <Truck className="w-5 h-5" />;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

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
      
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Vehicle</h1>
            <p className="text-lg text-gray-600">Choose from bikes, scooties, cars, and autos for your next journey</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search location..."
                  className="pl-10"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="scooty">Scooty</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-500">₹0 - ₹500/hr</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1000/hr</SelectItem>
                  <SelectItem value="1000+">₹1000+/hr</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700">
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listings */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Available Vehicles ({filteredVehicles.length})
            </h2>
            <Link to="/list-vehicle">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                List Your Vehicle
              </Button>
            </Link>
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {user ? "No vehicles available from other users matching your criteria" : "No vehicles found matching your criteria"}
              </p>
              {!user && (
                <p className="text-sm text-gray-400 mt-2">
                  Please log in to see available vehicles
                </p>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={vehicle.image_url || `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=200`}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      {getVehicleIcon(vehicle.type)}
                      <span className="text-sm font-medium capitalize">{vehicle.type}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{vehicle.brand} {vehicle.model}</CardTitle>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.location}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-sm text-gray-500">(24)</span>
                      </div>
                      <div className="text-lg font-bold text-blue-600">₹{vehicle.price_per_hour}/hr</div>
                    </div>
                    
                    <Link to={`/book-vehicle/${vehicle.id}`}>
                      <Button className="w-full">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vehicles;
