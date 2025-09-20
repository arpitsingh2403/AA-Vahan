
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Car, MapPin, DollarSign, Trash2, Save } from "lucide-react";

interface Vehicle {
  id: string;
  type: string;
  brand: string;
  model: string;
  number_plate: string;
  price_per_hour: number;
  location: string;
  image_url: string | null;
  is_available: boolean;
}

interface VehicleManageModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const VehicleManageModal = ({ vehicle, isOpen, onClose, onUpdate }: VehicleManageModalProps) => {
  const [formData, setFormData] = useState({
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    number_plate: vehicle.number_plate,
    price_per_hour: vehicle.price_per_hour.toString(),
    location: vehicle.location,
    image_url: vehicle.image_url || ""
  });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setFormData({
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      number_plate: vehicle.number_plate,
      price_per_hour: vehicle.price_per_hour.toString(),
      location: vehicle.location,
      image_url: vehicle.image_url || ""
    });
  }, [vehicle]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({
          type: formData.type,
          brand: formData.brand,
          model: formData.model,
          number_plate: formData.number_plate.toUpperCase(),
          price_per_hour: parseFloat(formData.price_per_hour),
          location: formData.location,
          image_url: formData.image_url || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', vehicle.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Vehicle updated successfully",
      });

      onUpdate();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update vehicle",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading(true);
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicle.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Vehicle deleted successfully",
      });

      onUpdate();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete vehicle",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Manage Vehicle - {vehicle.brand} {vehicle.model}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Vehicle Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="scooty">Scooty</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number_plate">Number Plate *</Label>
              <Input
                id="number_plate"
                value={formData.number_plate}
                onChange={(e) => handleInputChange('number_plate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_per_hour">Price per Hour (₹) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="price_per_hour"
                  type="number"
                  className="pl-10"
                  value={formData.price_per_hour}
                  onChange={(e) => handleInputChange('price_per_hour', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="location"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Vehicle Image URL (Optional)</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Vehicle Status</h3>
            <p className="text-sm text-yellow-700">
              Status: <span className="font-medium">{vehicle.is_available ? "Available" : "Currently Booked"}</span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteLoading || loading}
            className="mr-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deleteLoading ? "Deleting..." : "Delete Vehicle"}
          </Button>
          
          <Button variant="outline" onClick={onClose} disabled={loading || deleteLoading}>
            Cancel
          </Button>
          
          <Button onClick={handleUpdate} disabled={loading || deleteLoading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Updating..." : "Update Vehicle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleManageModal;
