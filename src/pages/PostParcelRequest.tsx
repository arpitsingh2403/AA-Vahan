

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Send, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationInputs from "@/components/LocationInputs";
import ParcelDetails from "@/components/ParcelDetails";
import PriceBreakdown from "@/components/PriceBreakdown";
import ParcelInfoSection from "@/components/ParcelInfoSection";
import { calculateDistance, calculatePrice } from "@/utils/parcelCalculations";

const PostParcelRequest = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate progress percentage
  const getProgress = () => {
    let completedFields = 0;
    if (pickupLocation) completedFields++;
    if (dropLocation) completedFields++;
    if (weight) completedFields++;
    return (completedFields / 3) * 100;
  };

  useEffect(() => {
    if (pickupLocation && dropLocation && weight) {
      const calculatedDistance = calculateDistance(pickupLocation, dropLocation);
      const calculatedPrice = calculatePrice(weight, calculatedDistance);
      setDistance(calculatedDistance);
      setPrice(calculatedPrice);
      setCurrentStep(2);
    } else {
      setDistance(0);
      setPrice(0);
      setCurrentStep(1);
    }
  }, [pickupLocation, dropLocation, weight]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to post a parcel request");
      navigate("/login");
      return;
    }

    if (!pickupLocation || !dropLocation || !weight) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('parcels')
        .insert({
          sender_id: user.id,
          pickup_location: pickupLocation,
          drop_location: dropLocation,
          weight: parseFloat(weight),
          description: description || null,
          fee: price,
          distance: distance,
          status: 'open'
        })
        .select();

      if (error) throw error;

      toast.success("Parcel request posted successfully!");
      
      // Clear form
      setPickupLocation("");
      setDropLocation("");
      setWeight("");
      setDescription("");
      setPrice(0);
      setDistance(0);
      setCurrentStep(1);
      
      // Navigate to parcels page or dashboard
      navigate("/parcels");
    } catch (error: any) {
      console.error('Error posting parcel request:', error);
      toast.error(error.message || "Failed to post parcel request");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = pickupLocation && dropLocation && weight;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full mb-6 shadow-sm hover:shadow-md transition-all duration-300">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-medium">Send Parcels Safely & Securely</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
            Post Parcel Request
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Connect with trusted travelers going your way and send your parcels securely at affordable rates with real-time tracking
          </p>
          
          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(getProgress())}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg overflow-hidden group hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="pb-8 relative">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl text-gray-800 mb-2">Parcel Details</CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      Fill in your parcel information to connect with carriers
                    </CardDescription>
                  </div>
                </div>
                
                {/* Step Indicator */}
                <div className="flex items-center gap-4 mt-6">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentStep >= 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : <span className="w-4 h-4 flex items-center justify-center bg-current rounded-full text-white text-xs">1</span>}
                    Details
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <span className="w-4 h-4 flex items-center justify-center bg-current rounded-full text-white text-xs">2</span>
                    Review & Post
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-10 relative">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="transform transition-all duration-500 hover:scale-[1.01]">
                    <LocationInputs
                      pickupLocation={pickupLocation}
                      dropLocation={dropLocation}
                      onPickupChange={setPickupLocation}
                      onDropChange={setDropLocation}
                    />
                  </div>
                  
                  <div className="border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-10">
                    <div className="transform transition-all duration-500 hover:scale-[1.01]">
                      <ParcelDetails
                        weight={weight}
                        description={description}
                        onWeightChange={setWeight}
                        onDescriptionChange={setDescription}
                      />
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button 
                      type="submit" 
                      disabled={loading || !isFormValid}
                      className={`w-full h-16 text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none ${
                        isFormValid 
                          ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700' 
                          : 'bg-gray-300'
                      } disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl`}
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Creating Your Request...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Post Parcel Request
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            <div className="transform transition-all duration-500 hover:scale-[1.02]">
              <PriceBreakdown weight={weight} distance={distance} price={price} />
            </div>
            <div className="transform transition-all duration-500 hover:scale-[1.02]">
              <ParcelInfoSection />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostParcelRequest;

