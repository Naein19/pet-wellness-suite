import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  ClipboardList,
  DollarSign,
  FileText,
  Heart,
  Home,
  Package,
  Settings,
  Users,
  BarChart3,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    color: "text-primary",
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Heart,
    color: "text-primary",
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Medical Records",
    url: "/medical-records",
    icon: FileText,
    color: "text-green-500",
  },
  {
    title: "Billing",
    url: "/billing",
    icon: DollarSign,
    color: "text-yellow-500",
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Package,
    color: "text-purple-500",
  },
  {
    title: "Staff",
    url: "/staff",
    icon: Users,
    color: "text-indigo-500",
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    color: "text-orange-500",
  },
  {
    title: "Communication",
    url: "/communication",
    icon: MessageSquare,
    color: "text-pink-500",
  },
];

export function VCMSSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full transition-medical rounded-lg ${
      isActive
        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
        : "hover:bg-muted/50 text-foreground/70 hover:text-foreground"
    }`;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-border/50 bg-sidebar/50 backdrop-blur-sm`}>
      <SidebarContent className="pt-4">
        {/* Logo/Brand */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-foreground">VetCare</h2>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings at bottom */}
        <div className="mt-auto p-4">
          <SidebarMenuButton asChild>
            <NavLink to="/settings" className={getNavClasses}>
              <Settings className="h-5 w-5 text-muted-foreground" />
              {!collapsed && (
                <span className="font-medium text-muted-foreground">Settings</span>
              )}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}