import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VCMSSidebar } from "./VCMSSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface VCMSLayoutProps {
  children: React.ReactNode;
}

const roleColors = {
  admin: "bg-gradient-to-r from-red-500 to-red-600",
  doctor: "bg-gradient-to-r from-blue-500 to-blue-600", 
  receptionist: "bg-gradient-to-r from-green-500 to-green-600",
  accountant: "bg-gradient-to-r from-purple-500 to-purple-600"
};

const roleEmojis = {
  admin: "👑",
  doctor: "👨‍⚕️",
  receptionist: "🏥", 
  accountant: "💰"
};

export function VCMSLayout({ children }: VCMSLayoutProps) {
  const { user, profile, userRoles, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-soft">
        <VCMSSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4">
            <SidebarTrigger className="hover:bg-primary/10 transition-medical" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">
                VetCare Management System
              </h1>
            </div>
            
            {/* Header actions */}
            <div className="flex items-center gap-4">
              {userRoles.length > 0 && (
                <Badge variant="secondary" className="hidden sm:flex gap-1">
                  <span>{roleEmojis[userRoles[0] as keyof typeof roleEmojis]}</span>
                  <span className="capitalize">{userRoles[0]}</span>
                </Badge>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-scale">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                      <AvatarFallback className={`text-white ${roleColors[(userRoles[0] as keyof typeof roleColors) || 'doctor']}`}>
                        {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        <Toaster />
        <Sonner />
      </div>
    </SidebarProvider>
  );
}