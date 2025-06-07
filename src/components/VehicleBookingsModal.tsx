
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, User, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: string;
  aadhar_number?: string;
  license_number?: string;
  created_at: string;
  vehicles: {
    brand: string;
    model: string;
    type: string;
    number_plate: string;
  };
}

interface VehicleBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}

const VehicleBookingsModal = ({ isOpen, onClose, onBookingComplete }: VehicleBookingsModalProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingBooking, setCompletingBooking] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchVehicleBookings();
    }
  }, [isOpen]);

  const fetchVehicleBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          vehicles (
            brand,
            model,
            type,
            number_plate
          )
        `)
        .eq('status', 'confirmed')
        .order('start_time', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    setCompletingBooking(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Booking marked as completed. Vehicle is now available.",
      });

      await fetchVehicleBookings();
      onBookingComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete booking",
        variant: "destructive",
      });
    } finally {
      setCompletingBooking(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    return diffInHours;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            My Vehicle Bookings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No active bookings found</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {booking.vehicles.brand} {booking.vehicles.model}
                    </CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 capitalize">
                    {booking.vehicles.type} • {booking.vehicles.number_plate}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-gray-600">
                          {calculateDuration(booking.start_time, booking.end_time)} hours
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Start Time</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(booking.start_time), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Total Price</p>
                        <p className="text-sm text-gray-600">₹{booking.total_price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">End Time</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(booking.end_time), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Booked On</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(booking.created_at), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>

                  {booking.status === 'confirmed' && (
                    <div className="pt-2 border-t border-gray-100">
                      <Button
                        onClick={() => handleCompleteBooking(booking.id)}
                        disabled={completingBooking === booking.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {completingBooking === booking.id ? "Completing..." : "Mark as Completed"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleBookingsModal;
