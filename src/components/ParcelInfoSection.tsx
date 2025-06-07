
import { Package, Users, CreditCard, MapPin, Shield, Clock, CheckCircle } from "lucide-react";

const ParcelInfoSection = () => {
  const steps = [
    {
      icon: Package,
      title: "Post your request",
      description: "Add pickup and drop locations with detailed parcel information",
      color: "indigo"
    },
    {
      icon: Users,
      title: "Find a carrier",
      description: "Verified travelers on the same route can accept your request",
      color: "purple"
    },
    {
      icon: CreditCard,
      title: "Secure payment",
      description: "Pay the calculated fee when a trusted carrier is confirmed",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Track delivery",
      description: "Monitor your parcel with real-time updates until safe delivery",
      color: "green"
    }
  ];

  const features = [
    { icon: Shield, text: "100% Secure & Insured" },
    { icon: CheckCircle, text: "Verified Carriers" },
    { icon: Clock, text: "Real-time Tracking" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      indigo: "from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-700 border-indigo-200",
      purple: "from-purple-500 to-purple-600 bg-purple-50 text-purple-700 border-purple-200",
      blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-700 border-blue-200",
      green: "from-green-500 to-green-600 bg-green-50 text-green-700 border-green-200"
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  return (
    <div className="space-y-6">
      {/* How it works */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-xl">How It Works</h3>
            <p className="text-indigo-600 text-sm">Simple, secure, and efficient</p>
          </div>
        </div>
        
        <div className="grid gap-5">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-start gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border hover:bg-white/90 transition-all duration-300 group/step ${getColorClasses(step.color).split(' ').slice(2).join(' ')}`}>
              <div className="flex-shrink-0 relative">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  <div className={`w-8 h-8 bg-gradient-to-br ${getColorClasses(step.color).split(' ').slice(0, 2).join(' ')} rounded-lg flex items-center justify-center group-hover/step:scale-110 transition-transform duration-200`}>
                    {index + 1}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent transform -translate-x-1/2" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="w-4 h-4" />
                  <h4 className="font-bold text-base">{step.title}</h4>
                </div>
                <p className="text-sm leading-relaxed opacity-90">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h4 className="font-bold text-green-800 text-lg mb-4 text-center">Why Choose Us?</h4>
        <div className="grid gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-200 group">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium text-green-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParcelInfoSection;

