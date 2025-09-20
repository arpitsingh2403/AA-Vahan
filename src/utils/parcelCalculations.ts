
export const calculateDistance = (pickup: string, drop: string): number => {
  // Mock distance calculation - in production, use Google Maps API or similar
  const mockDistances: Record<string, Record<string, number>> = {
    "mumbai": { "pune": 150, "delhi": 1400, "bangalore": 980 },
    "delhi": { "mumbai": 1400, "bangalore": 2150, "kolkata": 1470 },
    "bangalore": { "mumbai": 980, "delhi": 2150, "chennai": 350 },
    "pune": { "mumbai": 150, "delhi": 1350, "bangalore": 840 }
  };

  const pickupKey = pickup.toLowerCase().split(',')[0].trim();
  const dropKey = drop.toLowerCase().split(',')[0].trim();
  
  if (mockDistances[pickupKey] && mockDistances[pickupKey][dropKey]) {
    return mockDistances[pickupKey][dropKey];
  }
  
  return Math.floor(Math.random() * 500) + 50; // Random distance between 50-550 km
};

export const calculatePrice = (weight: string, distance: number): number => {
  const weightNum = parseFloat(weight) || 0;
  const weightCost = weightNum * 10; // ₹10 per kg
  const distanceCost = distance * 2; // ₹2 per km
  const totalCost = weightCost + distanceCost;
  
  return Math.max(totalCost, 50); // Minimum ₹50
};

export const getPriceBreakdown = (weight: string, distance: number) => {
  const weightNum = parseFloat(weight) || 0;
  const weightCost = weightNum * 10;
  const distanceCost = distance * 2;
  const total = Math.max(weightCost + distanceCost, 50);
  
  return {
    weightCost,
    distanceCost,
    total,
    isMinimum: total === 50 && (weightCost + distanceCost) < 50
  };
};
