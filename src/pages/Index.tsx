
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { ArrowRight, Star, Users, Shield, Clock, MapPin, Package, Car, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    { number: "10K+", label: "Happy Users", icon: Users },
    { number: "25K+", label: "Trips Completed", icon: Car },
    { number: "50K+", label: "Parcels Delivered", icon: Package },
    { number: "99.9%", label: "Success Rate", icon: Shield }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Frequent Traveler",
      content: "RentFlow made my Mumbai to Pune trip so much easier. Found a great car within minutes!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "Perfect for my daily parcel deliveries. Reliable carriers and affordable rates.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Anita Patel",
      role: "Student",
      content: "Love how easy it is to book vehicles for weekend trips with friends!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold">India's #1 Vehicle & Parcel Platform</span>
            <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
            Rent. Travel. Deliver.
            <br />
            <span className="text-5xl md:text-6xl">Seamlessly.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Connect with trusted vehicle owners and travelers for all your transportation and delivery needs across India
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/vehicles">
              <Button className="h-16 px-8 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl">
                <Car className="w-6 h-6 mr-3" />
                Rent Vehicles
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            <Link to="/add-parcel">
              <Button variant="outline" className="h-16 px-8 text-lg font-bold border-2 border-cyan-300 text-cyan-700 hover:bg-cyan-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-2xl">
                <Package className="w-6 h-6 mr-3" />
                Send Parcels
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />

      {/* Enhanced How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How RentFlow Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Simple steps to get started with vehicle rentals and parcel delivery</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vehicle Rental Process */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center text-indigo-700 mb-8">Vehicle Rental</h3>
              {[
                { step: 1, title: "Search & Filter", desc: "Find vehicles by location, type, and price", icon: MapPin },
                { step: 2, title: "Book Instantly", desc: "Choose your preferred vehicle and book", icon: Car },
                { step: 3, title: "Pick Up & Go", desc: "Collect your vehicle and start your journey", icon: ArrowRight }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Parcel Delivery Process */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center text-cyan-700 mb-8">Parcel Delivery</h3>
              {[
                { step: 1, title: "Post Request", desc: "Add pickup and delivery locations with details", icon: Package },
                { step: 2, title: "Find Carrier", desc: "Verified travelers accept your request", icon: Users },
                { step: 3, title: "Track & Receive", desc: "Monitor delivery with real-time updates", icon: Clock }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-cyan-600" />
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 opacity-90">Join the RentFlow community and experience seamless transportation</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button className="h-16 px-8 text-lg font-bold bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl">
                Sign Up Free
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            <Link to="/vehicles">
              <Button variant="outline" className="h-16 px-8 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-indigo-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl">
                Explore Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
