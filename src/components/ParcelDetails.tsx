
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Weight, FileText, Info, Package } from "lucide-react";
import { useState } from "react";

interface ParcelDetailsProps {
  weight: string;
  description: string;
  onWeightChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const ParcelDetails = ({
  weight,
  description,
  onWeightChange,
  onDescriptionChange,
}: ParcelDetailsProps) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="weight" className="text-lg font-bold text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
            <Weight className="w-4 h-4 text-white" />
          </div>
          Parcel Weight *
        </Label>
        <div className={`relative group transition-all duration-300 ${
          focusedField === 'weight' ? 'transform scale-[1.02]' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-30 rounded-xl transition-all duration-300 blur-sm" />
          <div className="relative">
            <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-600 z-10 transition-all duration-200 group-focus-within:scale-110" />
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              placeholder="2.5"
              className="pl-12 pr-16 h-14 border-2 border-gray-200 focus:border-violet-500 focus:ring-violet-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg rounded-xl hover:border-violet-300 group-hover:shadow-lg focus:shadow-xl"
              value={weight}
              onChange={(e) => onWeightChange(e.target.value)}
              onFocus={() => setFocusedField('weight')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-violet-100 px-3 py-1 rounded-full">
              <span className="text-violet-700 font-bold text-sm">kg</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 hover:shadow-sm transition-all duration-300">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
            <div className="text-violet-700">
              <p className="font-semibold mb-2 text-base">Weight Guidelines:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full" />
                  Max: 50kg per parcel
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full" />
                  Rate: ₹10 per kg
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full" />
                  Precision: 0.1kg steps
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="description" className="text-lg font-bold text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          Parcel Description
          <span className="text-sm font-normal text-gray-500">(Optional)</span>
        </Label>
        <div className={`relative group transition-all duration-300 ${
          focusedField === 'description' ? 'transform scale-[1.01]' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-30 rounded-xl transition-all duration-300 blur-sm" />
          <div className="relative">
            <Package className="absolute left-4 top-4 w-5 h-5 text-blue-600 z-10 transition-all duration-200 group-focus-within:scale-110" />
            <Textarea
              id="description"
              placeholder="Describe your parcel contents (e.g., documents, electronics, gifts, books). Be specific for better handling and carrier confidence."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className="pl-12 pt-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm resize-none text-base rounded-xl hover:border-blue-300 group-hover:shadow-lg focus:shadow-xl"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 ml-2 flex items-center gap-2">
          <div className="w-1 h-1 bg-blue-500 rounded-full" />
          Detailed descriptions help carriers provide better service and build trust
        </p>
      </div>
    </div>
  );
};

export default ParcelDetails;

