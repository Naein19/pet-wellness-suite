import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar as CalendarIcon,
  Download,
  Filter,
  FileText,
  Activity,
  Users,
  Heart,
} from "lucide-react";

// Mock data for reports
const monthlyRevenueData = [
  { month: "Jul", revenue: 45000, appointments: 120, patients: 89 },
  { month: "Aug", revenue: 52000, appointments: 135, patients: 102 },
  { month: "Sep", revenue: 48000, appointments: 128, patients: 95 },
  { month: "Oct", revenue: 58000, appointments: 145, patients: 118 },
  { month: "Nov", revenue: 62000, appointments: 158, patients: 127 },
  { month: "Dec", revenue: 67000, appointments: 165, patients: 134 },
  { month: "Jan", revenue: 71000, appointments: 175, patients: 142 },
];

const patientTypeDistribution = [
  { name: "Dogs", value: 45, count: 567, color: "#3B82F6" },
  { name: "Cats", value: 30, count: 378, color: "#10B981" },
  { name: "Birds", value: 15, count: 189, color: "#F59E0B" },
  { name: "Rabbits", value: 6, count: 76, color: "#8B5CF6" },
  { name: "Others", value: 4, count: 50, color: "#EF4444" },
];

const serviceTypeData = [
  { service: "Checkups", count: 234, revenue: 187200 },
  { service: "Vaccinations", count: 189, revenue: 94500 },
  { service: "Surgeries", count: 45, revenue: 180000 },
  { service: "Treatments", count: 156, revenue: 234000 },
  { service: "Emergency", count: 67, revenue: 201000 },
];

const weeklyAppointments = [
  { day: "Mon", appointments: 28, completed: 26, cancelled: 2 },
  { day: "Tue", appointments: 32, completed: 30, cancelled: 2 },
  { day: "Wed", appointments: 25, completed: 23, cancelled: 2 },
  { day: "Thu", appointments: 35, completed: 32, cancelled: 3 },
  { day: "Fri", appointments: 30, completed: 28, cancelled: 2 },
  { day: "Sat", appointments: 20, completed: 18, cancelled: 2 },
  { day: "Sun", appointments: 15, completed: 14, cancelled: 1 },
];

export default function Reports() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState("revenue");

  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalPatients = patientTypeDistribution.reduce((sum, item) => sum + item.count, 0);
  const totalAppointments = monthlyRevenueData.reduce((sum, item) => sum + item.appointments, 0);
  const averageRevenue = totalRevenue / monthlyRevenueData.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gradient-primary text-white shadow-primary gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Configure date range and report type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="patient">Patient Analytics</SelectItem>
                  <SelectItem value="appointment">Appointment Summary</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                  <SelectItem value="staff">Staff Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Input type="date" className="w-full" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Input type="date" className="w-full" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Generate</label>
              <Button className="w-full gradient-primary text-white">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-success">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +12% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <p className="text-2xl font-bold text-primary">{totalAppointments}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +8% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold text-warning">{totalPatients}</p>
              </div>
              <Heart className="h-8 w-8 text-warning/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +15% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Revenue</p>
                <p className="text-2xl font-bold text-accent-foreground">₹{Math.round(averageRevenue).toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-accent-foreground/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Monthly average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#revenueGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Distribution */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Patient Type Distribution
            </CardTitle>
            <CardDescription>Breakdown of patients by animal type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {patientTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Revenue */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Service Performance
            </CardTitle>
            <CardDescription>Revenue by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceTypeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="service" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Appointments */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Weekly Appointments
            </CardTitle>
            <CardDescription>Appointment trends by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyAppointments}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Top Performing Services</CardTitle>
            <CardDescription>Highest revenue generating services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceTypeData.slice(0, 3).map((service, index) => (
                <div key={service.service} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-primary/20 text-primary' :
                      index === 1 ? 'bg-success/20 text-success' :
                      'bg-warning/20 text-warning'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{service.service}</p>
                      <p className="text-sm text-muted-foreground">{service.count} procedures</p>
                    </div>
                  </div>
                  <p className="font-bold">₹{service.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Patient Statistics</CardTitle>
            <CardDescription>Patient demographic breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientTypeDistribution.slice(0, 3).map((type, index) => (
                <div key={type.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: type.color }}
                    />
                    <div>
                      <p className="font-medium">{type.name}</p>
                      <p className="text-sm text-muted-foreground">{type.value}% of total</p>
                    </div>
                  </div>
                  <p className="font-bold">{type.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                <div>
                  <p className="font-medium text-success">Revenue Growth</p>
                  <p className="text-sm text-muted-foreground">This month vs last</p>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">
                  +12%
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                <div>
                  <p className="font-medium text-primary">New Patients</p>
                  <p className="text-sm text-muted-foreground">Monthly acquisitions</p>
                </div>
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  +15%
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                <div>
                  <p className="font-medium text-warning">Appointment Rate</p>
                  <p className="text-sm text-muted-foreground">Booking efficiency</p>
                </div>
                <Badge variant="default" className="bg-warning text-warning-foreground">
                  92%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Quick Report Actions</CardTitle>
          <CardDescription>Generate specific reports and exports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <FileText className="h-6 w-6 text-primary" />
              <span>Financial Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-success/50 transition-medical">
              <Heart className="h-6 w-6 text-success" />
              <span>Patient Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-warning/50 transition-medical">
              <CalendarIcon className="h-6 w-6 text-warning" />
              <span>Schedule Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-accent/50 transition-medical">
              <Users className="h-6 w-6 text-accent-foreground" />
              <span>Staff Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}