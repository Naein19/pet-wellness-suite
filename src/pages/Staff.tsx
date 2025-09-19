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
  Users,
  Plus,
  Search,
  Shield,
  Stethoscope,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Edit,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";

// Mock staff data
const staffMembers = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    role: "Senior Veterinarian",
    department: "Surgery & General Care",
    email: "sarah.wilson@vetcare.com",
    phone: "+91 98765 43210",
    avatar: "/placeholder.svg",
    status: "Active",
    joinDate: "2022-03-15",
    specialization: "Small Animal Surgery",
    license: "VET-2022-001",
    experience: "8 years",
    schedule: "Mon-Fri 9:00-17:00",
    permissions: ["Full Access", "Surgery", "Prescriptions"]
  },
  {
    id: 2,
    name: "Dr. Mike Brown",
    role: "Veterinarian",
    department: "General Care",
    email: "mike.brown@vetcare.com",
    phone: "+91 87654 32109",
    avatar: "/placeholder.svg",
    status: "Active",
    joinDate: "2023-01-10",
    specialization: "Internal Medicine",
    license: "VET-2023-002",
    experience: "5 years",
    schedule: "Tue-Sat 10:00-18:00",
    permissions: ["General Access", "Consultations", "Prescriptions"]
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Veterinary Technician",
    department: "Patient Care",
    email: "emily.johnson@vetcare.com",
    phone: "+91 76543 21098",
    avatar: "/placeholder.svg",
    status: "Active",
    joinDate: "2023-06-20",
    specialization: "Patient Care & Assistance",
    license: "VT-2023-003",
    experience: "3 years",
    schedule: "Mon-Fri 8:00-16:00",
    permissions: ["Limited Access", "Patient Records"]
  },
  {
    id: 4,
    name: "Robert Chen",
    role: "Receptionist",
    department: "Administration",
    email: "robert.chen@vetcare.com",
    phone: "+91 65432 10987",
    avatar: "/placeholder.svg",
    status: "Active",
    joinDate: "2023-09-05",
    specialization: "Customer Service",
    license: "N/A",
    experience: "2 years",
    schedule: "Mon-Sat 9:00-17:00",
    permissions: ["Reception Access", "Appointments", "Billing"]
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Practice Manager",
    department: "Administration",
    email: "lisa.park@vetcare.com",
    phone: "+91 54321 09876",
    avatar: "/placeholder.svg",
    status: "Active",
    joinDate: "2021-11-12",
    specialization: "Practice Management",
    license: "PM-2021-001",
    experience: "10 years",
    schedule: "Mon-Fri 8:00-18:00",
    permissions: ["Admin Access", "Staff Management", "Reports"]
  }
];

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    if (role.includes("Veterinarian")) {
      return <Stethoscope className="h-4 w-4 text-primary" />;
    } else if (role.includes("Technician")) {
      return <UserCheck className="h-4 w-4 text-success" />;
    } else if (role.includes("Manager")) {
      return <Shield className="h-4 w-4 text-warning" />;
    } else {
      return <Users className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      'Senior Veterinarian': 'default',
      'Veterinarian': 'secondary',
      'Veterinary Technician': 'outline',
      'Practice Manager': 'destructive',
      'Receptionist': 'outline'
    };
    return <Badge variant={variants[role] || 'outline'}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'On Leave': 'secondary',
      'Inactive': 'outline'
    };
    const icons = {
      'Active': <CheckCircle className="h-3 w-3 mr-1" />,
      'On Leave': <Clock className="h-3 w-3 mr-1" />,
      'Inactive': <Clock className="h-3 w-3 mr-1" />
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="flex items-center">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const activeStaff = staffMembers.filter(s => s.status === 'Active').length;
  const totalStaff = staffMembers.length;
  const veterinarians = staffMembers.filter(s => s.role.includes('Veterinarian')).length;
  const supportStaff = staffMembers.filter(s => !s.role.includes('Veterinarian')).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Staff Management
          </h1>
          <p className="text-muted-foreground">Manage team members, roles, and schedules</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Add a new team member with their role and permissions.</DialogDescription>
            </DialogHeader>
            {/* Staff form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              Staff member form will be implemented here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold text-primary">{totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All team members
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">{activeStaff}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Currently working
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Veterinarians</p>
                <p className="text-2xl font-bold text-warning">{veterinarians}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-warning/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Licensed doctors
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Support Staff</p>
                <p className="text-2xl font-bold text-accent-foreground">{supportStaff}</p>
              </div>
              <UserCheck className="h-8 w-8 text-accent-foreground/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Technicians & admin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff by name, role, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Complete list of clinic staff and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id} className="hover:bg-muted/30 transition-medical">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback className="bg-primary/10">
                          {getRoleIcon(staff.role)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {staff.license !== 'N/A' ? staff.license : `ST-${staff.id.toString().padStart(3, '0')}`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getRoleBadge(staff.role)}
                      <p className="text-sm text-muted-foreground mt-1">{staff.department}</p>
                      <p className="text-xs text-muted-foreground">{staff.specialization}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {staff.email}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {staff.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{staff.schedule}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined: {staff.joinDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{staff.experience}</p>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(staff.status)}
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
          <CardDescription>Common staff management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Users className="h-6 w-6 text-primary" />
              <span>Add Staff</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-success/50 transition-medical">
              <Calendar className="h-6 w-6 text-success" />
              <span>Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-warning/50 transition-medical">
              <Shield className="h-6 w-6 text-warning" />
              <span>Permissions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-accent/50 transition-medical">
              <UserCheck className="h-6 w-6 text-accent-foreground" />
              <span>Attendance</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}