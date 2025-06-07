
import { DollarSign, Package, MapPin, Info, TrendingUp, Calculator } from "lucide-react";

interface PriceBreakdownProps {
  weight: string;
  distance: number;
  price: number;
}

const PriceBreakdown = ({ weight, distance, price }: PriceBreakdownProps) => {
  if (price <= 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-slate-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center group hover:border-gray-400 transition-all duration-300">
        <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="font-bold text-gray-600 text-lg mb-2">Price Calculator</h3>
        <p className="text-gray-500">Fill in location and weight details to see your delivery fee</p>
      </div>
    );
  }

  const weightCost = (parseFloat(weight) || 0) * 10;
  const distanceCost = distance * 2;
  const isMinimum = price === 50 && (weightCost + distanceCost) < 50;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 text-xl mb-1">Delivery Fee</h3>
            <p className="text-emerald-600 text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Calculated in real-time
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-emerald-600 mb-1">₹{price}</div>
          <div className="text-xs text-emerald-600 font-medium bg-emerald-100 px-2 py-1 rounded-full">
            All inclusive
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-3 px-4 bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100 hover:bg-white/90 transition-all duration-200 group/item">
          <div className="flex items-center gap-3 text-emerald-700">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
              <Package className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="font-semibold">Weight Charge</span>
              <div className="text-xs text-emerald-600">{weight}kg × ₹10/kg</div>
            </div>
          </div>
          <span className="font-bold text-emerald-800 text-lg">₹{weightCost}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 px-4 bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100 hover:bg-white/90 transition-all duration-200 group/item">
          <div className="flex items-center gap-3 text-emerald-700">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="font-semibold">Distance Charge</span>
              <div className="text-xs text-emerald-600">{distance}km × ₹2/km</div>
            </div>
          </div>
          <span className="font-bold text-emerald-800 text-lg">₹{distanceCost}</span>
        </div>
      </div>

      {isMinimum && (
        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:shadow-sm transition-all duration-300">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-blue-700">
            <p className="font-semibold mb-1">Minimum Charge Applied</p>
            <p className="text-sm leading-relaxed">
              We maintain a minimum delivery fee of ₹50 to ensure quality service and fair compensation for our carriers.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-emerald-200">
        <p className="text-xs text-emerald-600 text-center flex items-center justify-center gap-1">
          <Info className="w-3 h-3" />
          Price includes platform fee and insurance coverage
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;

