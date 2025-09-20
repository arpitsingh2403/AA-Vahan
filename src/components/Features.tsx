
import { Shield, Clock, MapPin, Users, Star, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Users",
      description: "All vehicle owners and users are verified for your safety and security."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any issues."
    },
    {
      icon: MapPin,
      title: "Route Matching",
      description: "Smart algorithm to match parcel delivery routes with your travel plans."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a community of trusted vehicle owners and delivery volunteers."
    },
    {
      icon: Star,
      title: "Rated & Reviewed",
      description: "Transparent rating system to ensure quality service for everyone."
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Quick and easy booking process with instant confirmations."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RentFlow?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide a secure, efficient, and user-friendly platform for all your transportation and delivery needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
