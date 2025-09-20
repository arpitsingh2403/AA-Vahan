
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Package, Clock, ArrowRight, Weight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Parcel {
  id: string;
  pickup_location: string;
  drop_location: string;
  weight: number;
  fee: number;
  description: string;
  created_at: string;
  status: string;
  sender_id: string;
  distance: number;
  profiles: {
    full_name: string;
  };
}

const Parcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const { data, error } = await supabase
        .from('parcels')
        .select(`
          *,
          profiles!parcels_sender_id_fkey (
            full_name
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParcels(data || []);
    } catch (error: any) {
      console.error('Error fetching parcels:', error);
      toast({
        title: "Error",
        description: "Failed to load parcels",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptParcel = async (parcelId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to accept a parcel",
        variant: "destructive",
      });
      return;
    }

    try {
      // Insert into accepted_parcels table
      const { error: acceptError } = await supabase
        .from('accepted_parcels')
        .insert([{
          parcel_id: parcelId,
          carrier_user_id: user.id
        }]);

      if (acceptError) throw acceptError;

      // Update parcel status
      const { error: updateError } = await supabase
        .from('parcels')
        .update({ status: 'accepted' })
        .eq('id', parcelId);

      if (updateError) throw updateError;

      toast({
        title: "Success!",
        description: "You have accepted the parcel delivery request",
      });

      // Refresh the list
      fetchParcels();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to accept parcel",
        variant: "destructive",
      });
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours === 1) return "1 hour ago";
    return `${diffInHours} hours ago`;
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Parcel Requests</h1>
            <p className="text-lg text-gray-600">Earn money by delivering parcels that match your travel route</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Search route..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Fee Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fees</SelectItem>
                  <SelectItem value="0-100">₹0 - ₹100</SelectItem>
                  <SelectItem value="100-200">₹100 - ₹200</SelectItem>
                  <SelectItem value="200+">₹200+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parcel Listings */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Available Parcel Requests ({parcels.length})</h2>
            <Link to="/add-parcel">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Post Parcel Request
              </Button>
            </Link>
          </div>

          {parcels.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No parcel requests available</h3>
              <p className="text-gray-500">Be the first to post a parcel request!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {parcels.map((parcel) => (
                <Card key={parcel.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">Parcel Delivery Request</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">
                        Open
                      </Badge>
                    </div>
                    
                    {/* Route */}
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{parcel.pickup_location}</span>
                      <ArrowRight className="w-4 h-4" />
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm">{parcel.drop_location}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 mb-4">{parcel.description || "No description provided"}</p>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Weight className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Weight: {parcel.weight}kg</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">₹{parcel.fee}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">By: {parcel.profiles?.full_name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{getTimeAgo(parcel.created_at)}</span>
                      </div>
                      {parcel.distance && (
                        <div className="flex items-center space-x-2 col-span-2">
                          <span className="text-sm text-gray-600">Distance: {parcel.distance}km</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button 
                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                        onClick={() => handleAcceptParcel(parcel.id)}
                        disabled={!user || parcel.sender_id === user?.id}
                      >
                        {parcel.sender_id === user?.id ? 'Your Request' : 'Accept Delivery'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-2xl p-8 max-w-2xl mx-auto">
              <Package className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Earning Today</h3>
              <p className="text-gray-600 mb-6">
                Turn your regular travels into earning opportunities by delivering parcels along your route
              </p>
              <Link to="/add-parcel">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Post Your First Parcel Request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Parcels;
