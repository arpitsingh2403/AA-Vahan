
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Car, Menu, X, User, LogOut, Package, Plus, Home, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/vehicles", label: "Vehicles", icon: Car },
    { path: "/parcels", label: "Parcels", icon: Package },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                RentFlow
              </h1>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span className="text-xs text-gray-500 font-medium">Premium Platform</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button 
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className={`h-12 px-6 text-sm font-medium transition-all duration-300 rounded-xl ${
                    isActive(link.path) 
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg" 
                      : "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 hover:text-indigo-700"
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex space-x-2">
                  <Link to="/list-vehicle">
                    <Button 
                      variant="outline" 
                      className="h-12 px-4 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      List Vehicle
                    </Button>
                  </Link>
                  <Link to="/add-parcel">
                    <Button 
                      variant="outline" 
                      className="h-12 px-4 border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300 rounded-xl"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Send Parcel
                    </Button>
                  </Link>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-12 w-12 rounded-full p-0 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50">
                      <Avatar className="h-10 w-10 ring-2 ring-indigo-100">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-xl" align="end">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 rounded-lg m-1">
                      <Link to="/dashboard" className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-indigo-600" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-100" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer text-red-600 hover:bg-red-50 rounded-lg m-1"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="h-12 px-6 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 hover:text-indigo-700 transition-all duration-300 rounded-xl"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-12 w-12 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant={isActive(link.path) ? "default" : "ghost"}
                    className={`w-full justify-start h-12 text-sm font-medium transition-all duration-300 rounded-xl ${
                      isActive(link.path) 
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white" 
                        : "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 hover:text-indigo-700"
                    }`}
                  >
                    <link.icon className="w-4 h-4 mr-3" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              
              {user ? (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Link to="/list-vehicle" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start h-12 border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-xl">
                      <Plus className="w-4 h-4 mr-3" />
                      List Vehicle
                    </Button>
                  </Link>
                  <Link to="/add-parcel" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start h-12 border-cyan-200 text-cyan-700 hover:bg-cyan-50 rounded-xl">
                      <Package className="w-4 h-4 mr-3" />
                      Send Parcel
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 rounded-xl">
                      <User className="w-4 h-4 mr-3" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="w-full justify-start h-12 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 rounded-xl">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
