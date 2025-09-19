import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VCMSSidebar } from "./VCMSSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface VCMSLayoutProps {
  children: React.ReactNode;
}

export function VCMSLayout({ children }: VCMSLayoutProps) {
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
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                Dr
              </div>
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