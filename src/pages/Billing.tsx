import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "recharts";
import {
  DollarSign,
  Plus,
  Search,
  Calendar,
  Receipt,
  TrendingUp,
  CreditCard,
  Eye,
  Download,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

// Mock billing data
const bills = [
  {
    id: "INV-001",
    patientName: "Buddy",
    ownerName: "John Smith",
    date: "2024-01-15",
    services: [
      { name: "Regular Checkup", price: 800 },
      { name: "Vaccination - DHPP", price: 600 },
      { name: "Deworming", price: 200 }
    ],
    subtotal: 1600,
    tax: 288,
    discount: 80,
    total: 1808,
    status: "Paid",
    paymentMethod: "Card",
    dueDate: "2024-01-15"
  },
  {
    id: "INV-002",
    patientName: "Whiskers",
    ownerName: "Sarah Johnson",
    date: "2024-01-14",
    services: [
      { name: "Treatment - URI", price: 1200 },
      { name: "Antibiotics", price: 300 },
      { name: "Follow-up Consultation", price: 500 }
    ],
    subtotal: 2000,
    tax: 360,
    discount: 0,
    total: 2360,
    status: "Pending",
    paymentMethod: "Pending",
    dueDate: "2024-01-21"
  },
  {
    id: "INV-003",
    patientName: "Charlie",
    ownerName: "Mike Brown",
    date: "2024-01-10",
    services: [
      { name: "Vaccination - Rabies", price: 500 },
      { name: "Health Certificate", price: 300 }
    ],
    subtotal: 800,
    tax: 144,
    discount: 40,
    total: 904,
    status: "Overdue",
    paymentMethod: "Cash",
    dueDate: "2024-01-17"
  }
];

// Revenue data for charts
const monthlyRevenue = [
  { month: "Aug", revenue: 45000, bills: 120 },
  { month: "Sep", revenue: 52000, bills: 135 },
  { month: "Oct", revenue: 48000, bills: 128 },
  { month: "Nov", revenue: 58000, bills: 145 },
  { month: "Dec", revenue: 62000, bills: 158 },
  { month: "Jan", revenue: 67000, bills: 165 },
];

const paymentMethodData = [
  { name: "Card", value: 45, color: "#3B82F6" },
  { name: "Cash", value: 30, color: "#10B981" },
  { name: "UPI", value: 20, color: "#F59E0B" },
  { name: "Bank Transfer", value: 5, color: "#8B5CF6" },
];

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredBills = bills.filter(bill =>
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'Paid': 'default',
      'Pending': 'secondary',
      'Overdue': 'destructive',
      'Cancelled': 'outline'
    };
    const icons = {
      'Paid': <CheckCircle className="h-3 w-3 mr-1" />,
      'Pending': <Clock className="h-3 w-3 mr-1" />,
      'Overdue': <AlertCircle className="h-3 w-3 mr-1" />,
      'Cancelled': <AlertCircle className="h-3 w-3 mr-1" />
    };
    return (
      <Badge variant={variants[status] || 'default'} className="flex items-center">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const totalRevenue = bills.reduce((sum, bill) => sum + (bill.status === 'Paid' ? bill.total : 0), 0);
  const pendingAmount = bills.reduce((sum, bill) => sum + (bill.status === 'Pending' ? bill.total : 0), 0);
  const overdueAmount = bills.reduce((sum, bill) => sum + (bill.status === 'Overdue' ? bill.total : 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            Billing & Payments
          </h1>
          <p className="text-muted-foreground">Manage invoices, payments, and financial records</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Generate a new invoice for services provided.</DialogDescription>
            </DialogHeader>
            {/* Invoice form would go here */}
            <div className="p-8 text-center text-muted-foreground">
              Comprehensive invoice creation form will be implemented here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Financial Overview */}
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
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">₹{pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-warning/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {bills.filter(b => b.status === 'Pending').length} invoices
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-destructive">₹{overdueAmount.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {bills.filter(b => b.status === 'Overdue').length} invoices
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">{bills.length}</p>
              </div>
              <Receipt className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Revenue
            </CardTitle>
            <CardDescription>Revenue trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
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
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Methods
            </CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices by patient, owner, or invoice ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>All invoices and payment records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient & Owner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id} className="hover:bg-muted/30 transition-medical">
                  <TableCell>
                    <div className="font-medium">{bill.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{bill.patientName}</p>
                      <p className="text-sm text-muted-foreground">{bill.ownerName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{bill.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {bill.services.slice(0, 2).map((service, index) => (
                        <div key={index} className="text-sm">
                          {service.name}
                        </div>
                      ))}
                      {bill.services.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{bill.services.length - 2} more
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">₹{bill.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        (Tax: ₹{bill.tax})
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(bill.status)}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{bill.dueDate}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
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
          <CardDescription>Common billing and payment tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Receipt className="h-6 w-6 text-primary" />
              <span>Quick Invoice</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <CreditCard className="h-6 w-6 text-success" />
              <span>Record Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Download className="h-6 w-6 text-warning" />
              <span>Export Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <span>Send Reminder</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}