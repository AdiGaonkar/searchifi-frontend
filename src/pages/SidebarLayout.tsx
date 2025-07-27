import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/SearchifiDashboard/AppSidebar"; // Sidebar component

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-4 bg-background">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
