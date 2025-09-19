import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  FileText,
  Plus,
  Search,
  Calendar,
  Stethoscope,
  Pill,
  Activity,
  Download,
  Eye,
  Edit,
} from "lucide-react";

// Mock medical records data
const medicalRecords = [
  {
    id: 1,
    patientName: "Buddy",
    ownerName: "John Smith",
    date: "2024-01-15",
    type: "Regular Checkup",
    doctor: "Dr. Sarah Wilson",
    diagnosis: "Healthy - Annual checkup completed",
    symptoms: "None reported",
    treatment: "Routine examination, vaccinations updated",
    medications: "None prescribed",
    nextAppointment: "2024-07-15",
    files: ["blood_test_results.pdf", "vaccination_record.pdf"],
    vitals: {
      weight: "32 kg",
      temperature: "38.5°C",
      heartRate: "80 bpm",
      respiratoryRate: "20 rpm"
    }
  },
  {
    id: 2,
    patientName: "Whiskers",
    ownerName: "Sarah Johnson",
    date: "2024-01-14",
    type: "Treatment",
    doctor: "Dr. Mike Brown",
    diagnosis: "Upper Respiratory Infection",
    symptoms: "Sneezing, nasal discharge, reduced appetite",
    treatment: "Antibiotic therapy, supportive care",
    medications: "Amoxicillin 50mg BID x 7 days, Supportive nutrition",
    nextAppointment: "2024-01-21",
    files: ["chest_xray.jpg", "prescription.pdf"],
    vitals: {
      weight: "4.5 kg",
      temperature: "39.2°C",
      heartRate: "140 bpm",
      respiratoryRate: "32 rpm"
    }
  },
  {
    id: 3,
    patientName: "Charlie",
    ownerName: "Mike Brown",
    date: "2024-01-10",
    type: "Vaccination",
    doctor: "Dr. Sarah Wilson",
    diagnosis: "Vaccination - DHPP, Rabies",
    symptoms: "None",
    treatment: "Administered DHPP and Rabies vaccines",
    medications: "None",
    nextAppointment: "2025-01-10",
    files: ["vaccination_certificate.pdf"],
    vitals: {
      weight: "28 kg",
      temperature: "38.3°C",
      heartRate: "75 bpm",
      respiratoryRate: "18 rpm"
    }
  }
];

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredRecords = medicalRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    const colors = {
      'Regular Checkup': 'text-primary',
      'Treatment': 'text-warning',
      'Vaccination': 'text-success',
      'Surgery': 'text-destructive',
      'Emergency': 'text-red-500'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      'Regular Checkup': 'default',
      'Treatment': 'secondary',
      'Vaccination': 'outline',
      'Surgery': 'destructive',
      'Emergency': 'destructive'
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Medical Records
          </h1>
          <p className="text-muted-foreground">Patient medical history, treatments, and documentation</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Medical Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Medical Record</DialogTitle>
              <DialogDescription>Document patient examination, diagnosis, and treatment details.</DialogDescription>
            </DialogHeader>
            {/* Medical record form would go here */}
            <div className="p-8 text-center text-muted-foreground">
              Comprehensive medical record form will be implemented here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <Card className="medical-card lg:col-span-3">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medical records by patient, owner, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{medicalRecords.length}</p>
              <p className="text-sm text-muted-foreground">Total Records</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Records Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checkups</p>
                <p className="text-2xl font-bold text-primary">
                  {medicalRecords.filter(r => r.type === 'Regular Checkup').length}
                </p>
              </div>
              <Stethoscope className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Treatments</p>
                <p className="text-2xl font-bold text-warning">
                  {medicalRecords.filter(r => r.type === 'Treatment').length}
                </p>
              </div>
              <Pill className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vaccinations</p>
                <p className="text-2xl font-bold text-success">
                  {medicalRecords.filter(r => r.type === 'Vaccination').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-destructive">
                  {medicalRecords.filter(r => new Date(r.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Patient Medical Records</CardTitle>
          <CardDescription>Complete medical history and treatment records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient & Owner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Vitals</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/30 transition-medical">
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.patientName}</p>
                      <p className="text-sm text-muted-foreground">{record.ownerName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{record.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(record.type)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{record.doctor}</p>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm truncate">{record.diagnosis}</p>
                      {record.symptoms !== "None" && record.symptoms !== "None reported" && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          Symptoms: {record.symptoms}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      <div>Weight: {record.vitals.weight}</div>
                      <div>Temp: {record.vitals.temperature}</div>
                      <div>HR: {record.vitals.heartRate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {record.files.map((file, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs justify-start"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {file.split('.')[0]}
                        </Button>
                      ))}
                    </div>
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

      {/* Quick Actions */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common medical record tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <FileText className="h-6 w-6 text-primary" />
              <span>New Record</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Activity className="h-6 w-6 text-success" />
              <span>Vaccination Log</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Pill className="h-6 w-6 text-warning" />
              <span>Prescription</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Download className="h-6 w-6 text-muted-foreground" />
              <span>Export Records</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}