import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Calendar,
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Stethoscope,
  Activity,
  Package,
  FileText,
  UserCheck,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Mock data for charts
const monthlyData = [
  { name: "Jan", patients: 65, revenue: 12000 },
  { name: "Feb", patients: 78, revenue: 15500 },
  { name: "Mar", patients: 82, revenue: 14200 },
  { name: "Apr", patients: 91, revenue: 18600 },
  { name: "May", patients: 88, revenue: 16800 },
  { name: "Jun", patients: 95, revenue: 20100 }
];

const patientTypeData = [
  { name: "Dogs", value: 45, color: "#3B82F6" },
  { name: "Cats", value: 35, color: "#10B981" },
  { name: "Birds", value: 12, color: "#F59E0B" },
  { name: "Others", value: 8, color: "#8B5CF6" }
];

const roleEmojis = {
  admin: "👑",
  doctor: "👨‍⚕️",
  receptionist: "🏥",
  accountant: "💰"
};

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
      <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        👑 Administrator
      </Badge>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="medical-card border-primary/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Heart className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">1,234</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-success/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">$20,100</div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-warning/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
          <Users className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">28</div>
          <p className="text-xs text-muted-foreground">5 doctors, 8 nurses, 15 support</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-accent/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
          <Package className="h-4 w-4 text-accent-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-foreground">456</div>
          <p className="text-xs text-muted-foreground">12 items low stock</p>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Patient visits and revenue trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Patient Distribution</CardTitle>
          <CardDescription>Patients by animal type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={patientTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {patientTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

const DoctorDashboard = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-foreground">Doctor Dashboard</h2>
      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        👨‍⚕️ Doctor
      </Badge>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="medical-card border-primary/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Appointments Today</CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">8</div>
          <p className="text-xs text-muted-foreground">Next: 2:00 PM - Max (Golden Retriever)</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-success/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Patients</CardTitle>
          <Heart className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">156</div>
          <p className="text-xs text-muted-foreground">Active patients under care</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-warning/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Surgeries This Week</CardTitle>
          <Stethoscope className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">3</div>
          <p className="text-xs text-muted-foreground">2 completed, 1 scheduled</p>
        </CardContent>
      </Card>
    </div>

    <Card className="medical-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks for today</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button className="gradient-primary text-white">
          <FileText className="w-4 h-4 mr-2" />
          New Prescription
        </Button>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          View Schedule
        </Button>
        <Button variant="outline">
          <Heart className="w-4 h-4 mr-2" />
          Patient Records
        </Button>
      </CardContent>
    </Card>
  </div>
);

const ReceptionistDashboard = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-foreground">Receptionist Dashboard</h2>
      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        🏥 Receptionist
      </Badge>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="medical-card border-success/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">24</div>
          <p className="text-xs text-muted-foreground">6 checked in, 18 pending</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-primary/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Walk-ins</CardTitle>
          <UserCheck className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">7</div>
          <p className="text-xs text-muted-foreground">Currently waiting</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-warning/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Patients</CardTitle>
          <Users className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">5</div>
          <p className="text-xs text-muted-foreground">Registered today</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-accent/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Calls</CardTitle>
          <Activity className="h-4 w-4 text-accent-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-foreground">12</div>
          <p className="text-xs text-muted-foreground">3 pending callbacks</p>
        </CardContent>
      </Card>
    </div>

    <Card className="medical-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Front desk essentials</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button className="gradient-primary text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
        <Button variant="outline">
          <Users className="w-4 h-4 mr-2" />
          Register Patient
        </Button>
        <Button variant="outline">
          <UserCheck className="w-4 h-4 mr-2" />
          Check-in Patient
        </Button>
      </CardContent>
    </Card>
  </div>
);

const AccountantDashboard = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-foreground">Accountant Dashboard</h2>
      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        💰 Accountant
      </Badge>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="medical-card border-success/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">$2,450</div>
          <p className="text-xs text-muted-foreground">+15% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-primary/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">18</div>
          <p className="text-xs text-muted-foreground">Total: $5,680</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-warning/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
          <TrendingUp className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">78%</div>
          <p className="text-xs text-muted-foreground">$15,600 / $20,000</p>
        </CardContent>
      </Card>

      <Card className="medical-card border-destructive/20 hover:shadow-medical transition-medical">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">5</div>
          <p className="text-xs text-muted-foreground">Total: $1,250</p>
        </CardContent>
      </Card>
    </div>

    <Card className="medical-card">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Monthly financial performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="medical-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Financial management tasks</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button className="gradient-primary text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate Invoice
        </Button>
        <Button variant="outline">
          <DollarSign className="w-4 h-4 mr-2" />
          Payment Records
        </Button>
        <Button variant="outline">
          <TrendingUp className="w-4 h-4 mr-2" />
          Financial Reports
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default function Dashboard() {
  const { profile, userRoles } = useAuth();

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    const primaryRole = userRoles[0];
    switch (primaryRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'receptionist':
        return <ReceptionistDashboard />;
      case 'accountant':
        return <AccountantDashboard />;
      default:
        return <DoctorDashboard />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {profile.full_name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening at your clinic today.
          </p>
        </div>
      </div>

      {renderDashboard()}
    </div>
  );
}