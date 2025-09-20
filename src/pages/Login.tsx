
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Car, Mail, Lock, Eye, EyeOff, Sparkles, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      // Error is handled in the useAuth hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      
      <Navbar />
      
      <div className="relative flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span className="text-indigo-700 font-semibold">Welcome Back to RentFlow</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              Sign In to Continue
            </h1>
            <p className="text-gray-600">Access your account and manage your bookings</p>
          </div>

          <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="text-center pb-8 relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Car className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your RentFlow account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-focus-within:opacity-20 rounded-xl transition-all duration-300 blur-sm" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="relative h-12 border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-focus-within:opacity-20 rounded-xl transition-all duration-300 blur-sm" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="relative h-12 pr-12 border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="remember"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2" 
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200">
                    Forgot password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 rounded-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      Sign In Securely
                    </div>
                  )}
                </Button>
              </form>
              
              <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              
              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors duration-200">
                  Create one now
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Login</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-500" />
                    <span>Privacy Protected</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
