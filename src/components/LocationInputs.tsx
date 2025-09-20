
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowRight, Navigation, Locate } from "lucide-react";
import { useState } from "react";

interface LocationInputsProps {
  pickupLocation: string;
  dropLocation: string;
  onPickupChange: (value: string) => void;
  onDropChange: (value: string) => void;
}

const LocationInputs = ({
  pickupLocation,
  dropLocation,
  onPickupChange,
  onDropChange,
}: LocationInputsProps) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="pickup_location" className="text-lg font-bold text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
            <Navigation className="w-4 h-4 text-white" />
          </div>
          Pickup Location *
        </Label>
        <div className={`relative group transition-all duration-300 ${
          focusedField === 'pickup' ? 'transform scale-[1.02]' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-30 rounded-xl transition-all duration-300 blur-sm" />
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-600 z-10 transition-all duration-200 group-focus-within:scale-110" />
            <Input
              id="pickup_location"
              placeholder="e.g., Andheri West, Mumbai, Maharashtra"
              className="pl-12 h-14 border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg rounded-xl hover:border-emerald-300 group-hover:shadow-lg focus:shadow-xl"
              value={pickupLocation}
              onChange={(e) => onPickupChange(e.target.value)}
              onFocus={() => setFocusedField('pickup')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <Locate className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors duration-200" />
          </div>
        </div>
        <p className="text-sm text-gray-600 ml-2 flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" />
          Enter the complete pickup address including landmarks
        </p>
      </div>

      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-100 via-purple-100 to-cyan-100 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group">
          <ArrowRight className="w-6 h-6 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
          <span className="text-lg font-semibold text-indigo-700">To Destination</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="drop_location" className="text-lg font-bold text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          Drop Location *
        </Label>
        <div className={`relative group transition-all duration-300 ${
          focusedField === 'drop' ? 'transform scale-[1.02]' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-red-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-30 rounded-xl transition-all duration-300 blur-sm" />
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-600 z-10 transition-all duration-200 group-focus-within:scale-110" />
            <Input
              id="drop_location"
              placeholder="e.g., Bandra East, Mumbai, Maharashtra"
              className="pl-12 h-14 border-2 border-gray-200 focus:border-rose-500 focus:ring-rose-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg rounded-xl hover:border-rose-300 group-hover:shadow-lg focus:shadow-xl"
              value={dropLocation}
              onChange={(e) => onDropChange(e.target.value)}
              onFocus={() => setFocusedField('drop')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <Locate className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-rose-600 cursor-pointer transition-colors duration-200" />
          </div>
        </div>
        <p className="text-sm text-gray-600 ml-2 flex items-center gap-2">
          <div className="w-1 h-1 bg-rose-500 rounded-full" />
          Enter the complete delivery address with contact details
        </p>
      </div>
    </div>
  );
};

export default LocationInputs;

