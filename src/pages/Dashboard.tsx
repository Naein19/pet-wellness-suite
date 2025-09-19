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
} from "lucide-react";

// Mock data for charts
const appointmentData = [
  { name: "Mon", appointments: 12, revenue: 2400 },
  { name: "Tue", appointments: 19, revenue: 3800 },
  { name: "Wed", appointments: 15, revenue: 3000 },
  { name: "Thu", appointments: 22, revenue: 4400 },
  { name: "Fri", appointments: 18, revenue: 3600 },
  { name: "Sat", appointments: 8, revenue: 1600 },
  { name: "Sun", appointments: 6, revenue: 1200 },
];

const patientTypeData = [
  { name: "Dogs", value: 45, color: "#3B82F6" },
  { name: "Cats", value: 30, color: "#10B981" },
  { name: "Birds", value: 15, color: "#F59E0B" },
  { name: "Others", value: 10, color: "#8B5CF6" },
];

const recentPatients = [
  { id: 1, name: "Buddy", type: "Dog", owner: "John Smith", status: "Healthy", lastVisit: "2024-01-15" },
  { id: 2, name: "Whiskers", type: "Cat", owner: "Sarah Johnson", status: "Treatment", lastVisit: "2024-01-14" },
  { id: 3, name: "Charlie", type: "Dog", owner: "Mike Brown", status: "Vaccination", lastVisit: "2024-01-14" },
  { id: 4, name: "Bella", type: "Cat", owner: "Emma Davis", status: "Surgery", lastVisit: "2024-01-13" },
];

const todayAppointments = [
  { time: "09:00", patient: "Max", owner: "Alice Cooper", type: "Checkup" },
  { time: "10:30", patient: "Luna", owner: "Bob Wilson", type: "Vaccination" },
  { time: "14:00", patient: "Rocky", owner: "Carol White", type: "Surgery" },
  { time: "15:30", patient: "Milo", owner: "David Lee", type: "Emergency" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your clinic today.</p>
        </div>
        <Button className="gradient-primary text-white shadow-primary">
          <Stethoscope className="w-4 h-4 mr-2" />
          Quick Checkup
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="medical-card border-primary/20 hover:shadow-medical transition-medical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card border-success/20 hover:shadow-medical transition-medical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Heart className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">1,234</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card border-warning/20 hover:shadow-medical transition-medical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹45,231</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +20% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card border-accent/20 hover:shadow-medical transition-medical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Users className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">12</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline w-3 h-3 mr-1" />
              All active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Appointments Chart */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Weekly Appointments
            </CardTitle>
            <CardDescription>Appointments and revenue for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={appointmentData}>
                <defs>
                  <linearGradient id="appointmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#appointmentGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Types Distribution */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Patient Distribution
            </CardTitle>
            <CardDescription>Types of animals treated this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

      {/* Recent Activity and Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Latest patient visits and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-medical">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name} ({patient.type})</p>
                      <p className="text-sm text-muted-foreground">Owner: {patient.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={patient.status === 'Healthy' ? 'default' : patient.status === 'Treatment' ? 'destructive' : 'secondary'}>
                      {patient.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{patient.lastVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Schedule
              <Badge variant="outline" className="text-primary border-primary/20">
                {todayAppointments.length} appointments
              </Badge>
            </CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-medical">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{appointment.time}</p>
                      <Badge variant={appointment.type === 'Emergency' ? 'destructive' : 'secondary'}>
                        {appointment.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {appointment.patient} - {appointment.owner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for efficient workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Heart className="h-6 w-6 text-primary" />
              <span>New Patient</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Calendar className="h-6 w-6 text-blue-500" />
              <span>Book Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <DollarSign className="h-6 w-6 text-warning" />
              <span>Generate Bill</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <span>Emergency</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}