import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, User } from "lucide-react";

interface PatientFormProps {
  onSave: () => void;
}

export function PatientForm({ onSave }: PatientFormProps) {
  const [formData, setFormData] = useState({
    // Patient Information
    patientName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    color: "",
    microchip: "",
    
    // Owner Information
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    
    // Medical Information
    allergies: "",
    medications: "",
    conditions: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save to database/API
    console.log("Saving patient:", formData);
    onSave();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Information */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Patient Information
          </CardTitle>
          <CardDescription>Basic details about the animal patient</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleChange("patientName", e.target.value)}
                placeholder="e.g., Buddy"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Select value={formData.species} onValueChange={(value) => handleChange("species", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                  <SelectItem value="hamster">Hamster</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => handleChange("breed", e.target.value)}
                placeholder="e.g., Golden Retriever"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="e.g., 3"
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="neutered-male">Neutered Male</SelectItem>
                  <SelectItem value="spayed-female">Spayed Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="e.g., 25.5"
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Color/Markings</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                placeholder="e.g., Golden, White spot on chest"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="microchip">Microchip ID</Label>
              <Input
                id="microchip"
                value={formData.microchip}
                onChange={(e) => handleChange("microchip", e.target.value)}
                placeholder="e.g., 123456789012345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owner Information */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Owner Information
          </CardTitle>
          <CardDescription>Contact details of the pet owner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name *</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                placeholder="e.g., John Smith"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="e.g., +91 98765 43210"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="e.g., john.smith@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleChange("emergencyContact", e.target.value)}
                placeholder="e.g., +91 87654 32109"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Full address including city and pincode"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>Health history and medical notes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allergies">Known Allergies</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
              placeholder="List any known allergies or reactions..."
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              value={formData.medications}
              onChange={(e) => handleChange("medications", e.target.value)}
              placeholder="List current medications and dosages..."
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="conditions">Medical Conditions</Label>
            <Textarea
              id="conditions"
              value={formData.conditions}
              onChange={(e) => handleChange("conditions", e.target.value)}
              placeholder="List any chronic conditions or past surgeries..."
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional information about the patient..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button type="submit" className="gradient-primary text-white">
          Save Patient
        </Button>
      </div>
    </form>
  );
}