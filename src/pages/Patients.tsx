import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Heart,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Dog,
  Cat,
  Bird,
} from "lucide-react";
import { PatientForm } from "@/components/PatientForm";

// Mock patient data
const patients = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "Male",
    weight: "32 kg",
    owner: {
      name: "John Smith",
      phone: "+91 98765 43210",
      email: "john.smith@email.com",
      address: "123 Park Street, Mumbai"
    },
    status: "Healthy",
    lastVisit: "2024-01-15",
    nextVaccination: "2024-02-15",
    microchip: "123456789",
    profileImage: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Cat",
    breed: "Persian",
    age: 2,
    gender: "Female",
    weight: "4.5 kg",
    owner: {
      name: "Sarah Johnson",
      phone: "+91 87654 32109",
      email: "sarah.j@email.com",
      address: "456 Oak Avenue, Delhi"
    },
    status: "Treatment",
    lastVisit: "2024-01-14",
    nextVaccination: "2024-03-01",
    microchip: "987654321",
    profileImage: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Charlie",
    type: "Dog",
    breed: "Labrador",
    age: 5,
    gender: "Male",
    weight: "28 kg",
    owner: {
      name: "Mike Brown",
      phone: "+91 76543 21098",
      email: "mike.brown@email.com",
      address: "789 Pine Road, Bangalore"
    },
    status: "Vaccination Due",
    lastVisit: "2024-01-10",
    nextVaccination: "2024-01-20",
    microchip: "456789123",
    profileImage: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Bella",
    type: "Cat",
    breed: "Siamese",
    age: 1,
    gender: "Female",
    weight: "3.2 kg",
    owner: {
      name: "Emma Davis",
      phone: "+91 65432 10987",
      email: "emma.davis@email.com",
      address: "321 Elm Street, Chennai"
    },
    status: "Surgery Recovery",
    lastVisit: "2024-01-13",
    nextVaccination: "2024-04-15",
    microchip: "789123456",
    profileImage: "/placeholder.svg"
  },
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAnimalIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'dog':
        return <Dog className="h-4 w-4" />;
      case 'cat':
        return <Cat className="h-4 w-4" />;
      case 'bird':
        return <Bird className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Healthy': 'default',
      'Treatment': 'destructive',
      'Vaccination Due': 'secondary',
      'Surgery Recovery': 'outline'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary" />
            Patient Management
          </h1>
          <p className="text-muted-foreground">Manage patient records, medical history, and owner information</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter patient and owner information to create a new record.</DialogDescription>
            </DialogHeader>
            <PatientForm onSave={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name, owner, or animal type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold text-primary">{patients.length}</p>
              </div>
              <Heart className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Healthy</p>
                <p className="text-2xl font-bold text-success">
                  {patients.filter(p => p.status === 'Healthy').length}
                </p>
              </div>
              <Dog className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Need Vaccination</p>
                <p className="text-2xl font-bold text-warning">
                  {patients.filter(p => p.status === 'Vaccination Due').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Treatment</p>
                <p className="text-2xl font-bold text-destructive">
                  {patients.filter(p => p.status.includes('Treatment') || p.status.includes('Surgery')).length}
                </p>
              </div>
              <Cat className="h-8 w-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>Complete list of registered patients and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Animal Info</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Next Vaccination</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/30 transition-medical">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={patient.profileImage} />
                        <AvatarFallback className="bg-primary/10">
                          {getAnimalIcon(patient.type)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {patient.microchip}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.owner.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.owner.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.type} - {patient.breed}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years, {patient.gender}, {patient.weight}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(patient.status)}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{patient.lastVisit}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{patient.nextVaccination}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}