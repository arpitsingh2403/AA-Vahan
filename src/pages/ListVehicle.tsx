
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car, Upload, MapPin, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ListVehicle = () => {
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    model: "",
    number_plate: "",
    price_per_hour: "",
    location: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to list a vehicle",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('vehicles')
        .insert([{
          owner_id: user.id,
          type: formData.type,
          brand: formData.brand,
          model: formData.model,
          number_plate: formData.number_plate.toUpperCase(),
          price_per_hour: parseFloat(formData.price_per_hour),
          location: formData.location,
          image_url: formData.image_url || null,
          is_available: true
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your vehicle has been listed successfully",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to list vehicle",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Login Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">You need to be logged in to list a vehicle.</p>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Navbar />
      
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Vehicle</h1>
            <p className="text-gray-600">Share your vehicle and earn money</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Vehicle Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bike">Bike</SelectItem>
                        <SelectItem value="scooty">Scooty</SelectItem>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Honda, Toyota"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      placeholder="e.g., City, Activa"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number_plate">Number Plate *</Label>
                    <Input
                      id="number_plate"
                      placeholder="e.g., MH01AB1234"
                      value={formData.number_plate}
                      onChange={(e) => handleInputChange('number_plate', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_per_hour">Price per Hour (₹) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="price_per_hour"
                        type="number"
                        placeholder="500"
                        className="pl-10"
                        value={formData.price_per_hour}
                        onChange={(e) => handleInputChange('price_per_hour', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="e.g., Mumbai, Maharashtra"
                        className="pl-10"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Vehicle Image URL (Optional)</Label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="image_url"
                      type="url"
                      placeholder="https://example.com/vehicle-image.jpg"
                      className="pl-10"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-500">Add a URL to your vehicle's image</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Vehicle Registration Verification</h3>
                  <p className="text-sm text-yellow-700">
                    By listing your vehicle, you confirm that:
                  </p>
                  <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                    <li>You are the owner of this vehicle</li>
                    <li>The vehicle registration details are accurate</li>
                    <li>The vehicle has valid insurance and documents</li>
                    <li>You have the right to rent out this vehicle</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  disabled={loading}
                >
                  {loading ? "Listing Vehicle..." : "List My Vehicle"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListVehicle;
