
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Package } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Rent Vehicles &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Deliver Parcels
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate marketplace for vehicle rentals and parcel delivery. 
            Find the perfect ride or earn money by delivering parcels on your route.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/vehicles">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Car className="w-5 h-5 mr-2" />
                Rent a Vehicle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/parcels">
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 w-full sm:w-auto">
                <Package className="w-5 h-5 mr-2" />
                Browse Parcels
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Car className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Vehicle Rental</h3>
                  <p className="text-gray-600 text-sm">
                    Choose from bikes, scooties, cars, and autos. Book instantly with transparent pricing.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Package className="w-12 h-12 text-teal-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Parcel Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Earn extra income by delivering parcels that match your travel route.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
