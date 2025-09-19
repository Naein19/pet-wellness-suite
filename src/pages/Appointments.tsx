import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
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
  CalendarDays,
  Plus,
  Clock,
  User,
  Stethoscope,
  Phone,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";

// Mock appointment data
const appointments = [
  {
    id: 1,
    time: "09:00",
    date: "2024-01-18",
    patient: "Buddy",
    owner: "John Smith",
    phone: "+91 98765 43210",
    type: "Regular Checkup",
    doctor: "Dr. Sarah Wilson",
    status: "Confirmed",
    duration: 30,
    notes: "Annual health checkup"
  },
  {
    id: 2,
    time: "10:30",
    date: "2024-01-18",
    patient: "Whiskers",
    owner: "Sarah Johnson",
    phone: "+91 87654 32109",
    type: "Vaccination",
    doctor: "Dr. Mike Brown",
    status: "Confirmed",
    duration: 15,
    notes: "Rabies vaccination"
  },
  {
    id: 3,
    time: "14:00",
    date: "2024-01-18",
    patient: "Rocky",
    owner: "Carol White",
    phone: "+91 76543 21098",
    type: "Surgery",
    doctor: "Dr. Sarah Wilson",
    status: "In Progress",
    duration: 120,
    notes: "Spay surgery"
  },
  {
    id: 4,
    time: "15:30",
    date: "2024-01-18",
    patient: "Milo",
    owner: "David Lee",
    phone: "+91 65432 10987",
    type: "Emergency",
    doctor: "Dr. Emergency Team",
    status: "Urgent",
    duration: 45,
    notes: "Accident injury - immediate attention needed"
  }
];

const todayStats = {
  total: appointments.length,
  confirmed: appointments.filter(a => a.status === 'Confirmed').length,
  inProgress: appointments.filter(a => a.status === 'In Progress').length,
  urgent: appointments.filter(a => a.status === 'Urgent').length,
};

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      'Confirmed': 'default',
      'In Progress': 'secondary',
      'Urgent': 'destructive',
      'Completed': 'outline'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Regular Checkup': 'text-primary',
      'Vaccination': 'text-success',
      'Surgery': 'text-warning',
      'Emergency': 'text-destructive'
    };
    return colors[type] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            Appointment Management
          </h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Book a new appointment for a patient.</DialogDescription>
            </DialogHeader>
            {/* Appointment form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              Appointment booking form will be implemented here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Today</p>
                <p className="text-2xl font-bold text-primary">{todayStats.total}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-success">{todayStats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">{todayStats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold text-destructive">{todayStats.urgent}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="medical-card lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-border/50"
            />
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="medical-card lg:col-span-3">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              {selectedDate?.toDateString() || "No date selected"} - {appointments.length} appointments scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient & Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-muted/30 transition-medical">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {appointment.owner}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {appointment.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </div>
                      {appointment.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {appointment.notes}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{appointment.doctor}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(appointment.status)}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{appointment.duration} min</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
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

      {/* Quick Actions */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common appointment management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <CalendarDays className="h-6 w-6 text-primary" />
              <span>Schedule Follow-up</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Clock className="h-6 w-6 text-warning" />
              <span>Reschedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <CheckCircle className="h-6 w-6 text-success" />
              <span>Mark Complete</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Stethoscope className="h-6 w-6 text-destructive" />
              <span>Emergency Slot</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}