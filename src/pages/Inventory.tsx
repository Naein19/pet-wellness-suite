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
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingDown,
  Pill,
  Syringe,
  Activity,
  Edit,
  Eye,
} from "lucide-react";

// Mock inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Amoxicillin Tablets",
    category: "Antibiotics",
    type: "Medicine",
    currentStock: 150,
    minStock: 50,
    maxStock: 300,
    unit: "tablets",
    costPerUnit: 5.50,
    supplier: "MedVet Pharmaceuticals",
    expiryDate: "2025-08-15",
    batchNumber: "AMX-2024-001",
    location: "Cabinet A-1",
    status: "In Stock"
  },
  {
    id: 2,
    name: "Rabies Vaccine",
    category: "Vaccines",
    type: "Vaccine",
    currentStock: 25,
    minStock: 30,
    maxStock: 100,
    unit: "vials",
    costPerUnit: 120.00,
    supplier: "VetBio Labs",
    expiryDate: "2024-12-20",
    batchNumber: "RBV-2024-003",
    location: "Refrigerator R-2",
    status: "Low Stock"
  },
  {
    id: 3,
    name: "Surgical Gloves",
    category: "Consumables",
    type: "Supplies",
    currentStock: 500,
    minStock: 100,
    maxStock: 1000,
    unit: "pairs",
    costPerUnit: 2.25,
    supplier: "MedSupply Co.",
    expiryDate: "2026-03-01",
    batchNumber: "SG-2024-012",
    location: "Storage Room S-3",
    status: "In Stock"
  },
  {
    id: 4,
    name: "Deworming Tablets",
    category: "Dewormers",
    type: "Medicine",
    currentStock: 8,
    minStock: 20,
    maxStock: 200,
    unit: "tablets",
    costPerUnit: 15.75,
    supplier: "PetCare Pharmaceuticals",
    expiryDate: "2024-02-28",
    batchNumber: "DWT-2023-045",
    location: "Cabinet B-2",
    status: "Critical"
  }
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (item: typeof inventoryItems[0]) => {
    if (item.currentStock <= 10 || item.status === 'Critical') {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Critical
      </Badge>;
    }
    if (item.currentStock <= item.minStock || item.status === 'Low Stock') {
      return <Badge variant="secondary" className="flex items-center gap-1">
        <TrendingDown className="h-3 w-3" />
        Low Stock
      </Badge>;
    }
    return <Badge variant="default" className="flex items-center gap-1">
      <CheckCircle className="h-3 w-3" />
      In Stock
    </Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'medicine':
        return <Pill className="h-4 w-4 text-primary" />;
      case 'vaccine':
        return <Syringe className="h-4 w-4 text-success" />;
      case 'supplies':
        return <Package className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const criticalItems = inventoryItems.filter(item => item.currentStock <= 10 || item.status === 'Critical');
  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock);
  const expiringItems = inventoryItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    return expiryDate <= oneMonthFromNow;
  });

  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            Inventory Management
          </h1>
          <p className="text-muted-foreground">Track medicines, vaccines, and supplies</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Add a new medicine, vaccine, or supply to the inventory.</DialogDescription>
            </DialogHeader>
            {/* Inventory form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              Inventory item form will be implemented here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-primary">{inventoryItems.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total value: ₹{totalValue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Stock</p>
                <p className="text-2xl font-bold text-destructive">{criticalItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Immediate attention needed
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-warning">{lowStockItems.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-warning/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Below minimum level
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-orange-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-500">{expiringItems.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Within next month
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
              placeholder="Search inventory by name, category, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Complete list of medicines, vaccines, and supplies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Cost/Unit</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-medical">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Batch: {item.batchNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Location: {item.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {item.currentStock} {item.unit}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            item.currentStock <= 10 ? 'bg-destructive' :
                            item.currentStock <= item.minStock ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ 
                            width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">₹{item.costPerUnit}</p>
                      <p className="text-xs text-muted-foreground">
                        Total: ₹{(item.currentStock * item.costPerUnit).toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{item.supplier}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.expiryDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item)}
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
          <CardDescription>Common inventory management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Plus className="h-6 w-6 text-primary" />
              <span>Stock In</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-warning/50 transition-medical">
              <TrendingDown className="h-6 w-6 text-warning" />
              <span>Low Stock Alert</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-destructive/50 transition-medical">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <span>Expiry Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-success/50 transition-medical">
              <Activity className="h-6 w-6 text-success" />
              <span>Stock Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}