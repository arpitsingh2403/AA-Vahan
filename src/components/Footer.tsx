
import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Sparkles, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Vehicle Rental", href: "/vehicles" },
      { name: "Parcel Delivery", href: "/add-parcel" },
      { name: "List Your Vehicle", href: "/list-vehicle" },
      { name: "Become a Carrier", href: "/register" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Safety", href: "/safety" },
      { name: "Careers", href: "/careers" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <Car className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">RentFlow</h1>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span className="text-xs text-gray-400 font-medium">Premium Platform</span>
                </div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              India's premier platform connecting travelers, vehicle owners, and parcel senders. 
              Experience seamless transportation solutions with verified partners across the country.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@rentflow.in</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:bg-cyan-400 transition-colors duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:bg-cyan-400 transition-colors duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:bg-cyan-400 transition-colors duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-2xl p-8 mb-12 border border-indigo-500/20">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get the latest updates on new features, offers, and transportation insights.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} RentFlow. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>in India. All rights reserved.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
