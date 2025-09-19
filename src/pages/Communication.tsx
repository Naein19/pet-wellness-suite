import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MessageSquare,
  Plus,
  Search,
  Mail,
  Phone,
  Send,
  Calendar,
  Bell,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

// Mock communication data
const communications = [
  {
    id: 1,
    type: "SMS Reminder",
    recipient: "John Smith",
    recipientType: "Patient Owner",
    patientName: "Buddy",
    subject: "Appointment Reminder",
    message: "Hi John, this is a reminder that Buddy has an appointment tomorrow at 2:00 PM for vaccination.",
    status: "Sent",
    scheduledDate: "2024-01-17",
    sentDate: "2024-01-17",
    method: "SMS"
  },
  {
    id: 2,
    type: "Email Campaign",
    recipient: "All Active Clients",
    recipientType: "Bulk",
    patientName: "N/A",
    subject: "New Year Health Checkup Offers",
    message: "Dear valued clients, start the new year with a comprehensive health checkup for your pets. Special 20% discount available until January 31st.",
    status: "Scheduled",
    scheduledDate: "2024-01-20",
    sentDate: null,
    method: "Email"
  },
  {
    id: 3,
    type: "Vaccination Reminder",
    recipient: "Sarah Johnson",
    recipientType: "Patient Owner",
    patientName: "Whiskers",
    subject: "Vaccination Due",
    message: "Hello Sarah, Whiskers is due for rabies vaccination. Please call us to schedule an appointment.",
    status: "Sent",
    scheduledDate: "2024-01-16",
    sentDate: "2024-01-16",
    method: "SMS"
  },
  {
    id: 4,
    type: "Follow-up Call",
    recipient: "Mike Brown",
    recipientType: "Patient Owner",
    patientName: "Charlie",
    subject: "Post-Surgery Follow-up",
    message: "Checking on Charlie's recovery after surgery. Please let us know how he's doing.",
    status: "Pending",
    scheduledDate: "2024-01-18",
    sentDate: null,
    method: "Phone"
  }
];

const templates = [
  {
    id: 1,
    name: "Appointment Reminder",
    type: "SMS",
    subject: "Appointment Reminder",
    message: "Hi {owner_name}, this is a reminder that {pet_name} has an appointment on {date} at {time} for {service}."
  },
  {
    id: 2,
    name: "Vaccination Due",
    type: "Email",
    subject: "Vaccination Reminder for {pet_name}",
    message: "Dear {owner_name}, {pet_name} is due for vaccination. Please schedule an appointment at your earliest convenience."
  },
  {
    id: 3,
    name: "Follow-up Care",
    type: "SMS",
    subject: "Follow-up Care",
    message: "Hi {owner_name}, we hope {pet_name} is recovering well. Please contact us if you have any concerns."
  }
];

export default function Communication() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);

  const filteredCommunications = communications.filter(comm =>
    comm.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comm.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'Sent': 'default',
      'Scheduled': 'secondary',
      'Pending': 'outline',
      'Failed': 'destructive'
    };
    const icons = {
      'Sent': <CheckCircle className="h-3 w-3 mr-1" />,
      'Scheduled': <Clock className="h-3 w-3 mr-1" />,
      'Pending': <Clock className="h-3 w-3 mr-1" />,
      'Failed': <AlertTriangle className="h-3 w-3 mr-1" />
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="flex items-center">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'sms':
        return <MessageSquare className="h-4 w-4 text-primary" />;
      case 'email':
        return <Mail className="h-4 w-4 text-success" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-warning" />;
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const sentCount = communications.filter(c => c.status === 'Sent').length;
  const scheduledCount = communications.filter(c => c.status === 'Scheduled').length;
  const pendingCount = communications.filter(c => c.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            Communication Center
          </h1>
          <p className="text-muted-foreground">Manage appointments reminders, campaigns, and client communications</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
                <DialogDescription>Send a direct message to a specific client or patient owner.</DialogDescription>
              </DialogHeader>
              {/* Message form would go here */}
              <div className="p-4 text-center text-muted-foreground">
                Direct message form will be implemented here
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white shadow-primary">
                <Send className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Marketing Campaign</DialogTitle>
                <DialogDescription>Send bulk messages to multiple clients or targeted groups.</DialogDescription>
              </DialogHeader>
              {/* Campaign form would go here */}
              <div className="p-8 text-center text-muted-foreground">
                Bulk campaign creation form will be implemented here
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Communication Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages Sent</p>
                <p className="text-2xl font-bold text-success">{sentCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-primary">{scheduledCount}</p>
              </div>
              <Clock className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Awaiting send time
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Requires attention
            </p>
          </CardContent>
        </Card>
        
        <Card className="medical-card border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Templates</p>
                <p className="text-2xl font-bold text-accent-foreground">{templates.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-accent-foreground/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Available templates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Templates */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>Pre-defined templates for common communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="medical-card border-primary/20 hover:shadow-medical transition-medical">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">{template.message}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communications by recipient, subject, or patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Communications Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
          <CardDescription>All sent and scheduled communications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type & Method</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommunications.map((comm) => (
                <TableRow key={comm.id} className="hover:bg-muted/30 transition-medical">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getMethodIcon(comm.method)}
                      <div>
                        <p className="font-medium">{comm.type}</p>
                        <p className="text-xs text-muted-foreground">{comm.method}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{comm.recipient}</p>
                      <p className="text-sm text-muted-foreground">{comm.recipientType}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{comm.subject}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {comm.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{comm.patientName}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{comm.scheduledDate}</span>
                    </div>
                    {comm.sentDate && (
                      <p className="text-xs text-muted-foreground">
                        Sent: {comm.sentDate}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(comm.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Send className="h-4 w-4" />
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
          <CardTitle>Quick Communication Actions</CardTitle>
          <CardDescription>Common communication tasks and automations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-primary/50 transition-medical">
              <Bell className="h-6 w-6 text-primary" />
              <span>Set Reminders</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-success/50 transition-medical">
              <Mail className="h-6 w-6 text-success" />
              <span>Email Campaign</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-warning/50 transition-medical">
              <MessageSquare className="h-6 w-6 text-warning" />
              <span>Bulk SMS</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-accent/50 transition-medical">
              <Users className="h-6 w-6 text-accent-foreground" />
              <span>Client Groups</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}