
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car, Calendar, Clock, CreditCard, User, FileText, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  type: string;
  price_per_hour: number;
  location: string;
  image_url: string;
  owner_id: string;
}

const BookVehicle = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    aadharNumber: "",
    licenseNumber: ""
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);

  useEffect(() => {
    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId]);

  useEffect(() => {
    calculatePrice();
  }, [formData.startDate, formData.startTime, formData.endDate, formData.endTime, vehicle]);

  const fetchVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId)
        .single();

      if (error) throw error;
      setVehicle(data);
    } catch (error: any) {
      console.error('Error fetching vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicle details",
        variant: "destructive",
      });
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!vehicle || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      return;
    }

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    if (endDateTime <= startDateTime) {
      setTotalPrice(0);
      setAdvanceAmount(0);
      return;
    }

    const diffInMs = endDateTime.getTime() - startDateTime.getTime();
    const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
    
    const total = diffInHours * vehicle.price_per_hour;
    setTotalPrice(total);
    setAdvanceAmount(Math.round(total * 0.5)); // 50% advance
  };

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
        description: "You must be logged in to book a vehicle",
        variant: "destructive",
      });
      return;
    }

    // Check if user is trying to book their own vehicle
    if (vehicle?.owner_id === user.id) {
      toast({
        title: "Error",
        description: "You cannot book your own vehicle",
        variant: "destructive",
      });
      return;
    }

    if (totalPrice <= 0) {
      toast({
        title: "Error",
        description: "Please select valid dates and times",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      const { error } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          vehicle_id: vehicleId,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          total_price: totalPrice,
          aadhar_number: formData.aadharNumber,
          license_number: formData.licenseNumber,
          status: 'confirmed',
          payment_status: 'advance_paid'
        }]);

      if (error) throw error;

      // Update vehicle availability
      await supabase
        .from('vehicles')
        .update({ is_available: false })
        .eq('id', vehicleId);

      // Simulate payment gateway (50% advance)
      toast({
        title: "Payment Successful!",
        description: `Advance payment of ₹${advanceAmount} completed successfully`,
      });

      toast({
        title: "Booking Confirmed!",
        description: "Your vehicle has been booked successfully",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to book vehicle",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Vehicle Not Found</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">The vehicle you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/vehicles')}>Browse Vehicles</Button>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Vehicle</h1>
            <p className="text-gray-600">Complete your booking details</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vehicle Details */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="w-6 h-6" />
                  <span>Vehicle Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={vehicle.image_url || "/placeholder.svg"} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-gray-600 capitalize">{vehicle.type}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{vehicle.location}</span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-lg font-semibold text-blue-800">₹{vehicle.price_per_hour}/hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date and Time Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="startDate"
                          type="date"
                          className="pl-10"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="startTime"
                          type="time"
                          className="pl-10"
                          value={formData.startTime}
                          onChange={(e) => handleInputChange('startTime', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="endDate"
                          type="date"
                          className="pl-10"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          min={formData.startDate || new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="endTime"
                          type="time"
                          className="pl-10"
                          value={formData.endTime}
                          onChange={(e) => handleInputChange('endTime', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadharNumber">Aadhar Card Number *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="aadharNumber"
                          placeholder="1234 5678 9012"
                          className="pl-10"
                          value={formData.aadharNumber}
                          onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                          pattern="[0-9]{4}\s[0-9]{4}\s[0-9]{4}"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Driving License Number *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="licenseNumber"
                          placeholder="DL-1420110012345"
                          className="pl-10"
                          value={formData.licenseNumber}
                          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {totalPrice > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Booking Summary</h3>
                      <div className="space-y-2 text-sm text-green-700">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{Math.ceil((new Date(`${formData.endDate}T${formData.endTime}`).getTime() - new Date(`${formData.startDate}T${formData.startTime}`).getTime()) / (1000 * 60 * 60))} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate per hour:</span>
                          <span>₹{vehicle.price_per_hour}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Amount:</span>
                          <span>₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg text-blue-700">
                          <span>Advance Payment (50%):</span>
                          <span>₹{advanceAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Remaining Amount:</span>
                          <span>₹{totalPrice - advanceAmount}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                    disabled={submitting || totalPrice <= 0}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {submitting ? "Processing..." : `Pay Advance ₹${advanceAmount} & Book`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookVehicle;
