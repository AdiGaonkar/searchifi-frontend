import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/contexts/AuthContext";

import LandingPage from "@/pages/LandingPage";
import ProjectsPage from "@/pages/ProjectsSections/ProjectsPage";
import ProjectDetailsPage from "@/pages/ProjectsSections/ProjectDetailsPage";
import LoginPage from "@/pages/Authpages/LoginPage";
import RegisterPage from "@/pages/Authpages/RegisterPage";
import UploadProjectPage from "@/pages/ProjectsSections/UploadProjectPage";
import UploadComponentPage from "@/pages/UploadComponentPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/NotFound";
import ProfileSettingsPage from "@/pages/ProfileSettingsPage";
import ComponentsPage from "@/pages/ComponentsPage";
import ComponentDetailsPage from "@/pages/ComponentDetailsPage";

import SidebarLayout from "@/pages/SidebarLayout";
import ProjectUplodation from "@/pages/Projectuplodation"; // ensure this file is PascalCase too
import WebsiteTemplate from "@/components/Websitetemplete"; // consider renaming the file
import APItesterfile from "./components/API tester/APItesterfile";
import ComponentShowcase from "./pages/components(uikits)/ComponentShowcase";
import ApiIndex from "./components/ai-builder-frontend/Pages/ApiIndex";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/components/:id" element={<ComponentDetailsPage />} />
            <Route path="/upload-project" element={<UploadProjectPage />} />
            <Route path="/website-template" element={<WebsiteTemplate />} />
             <Route path="/APItesterfile" element={<APItesterfile/>} />
              <Route path="/ComponentShowcase" element={<ComponentShowcase/>} />
              <Route path="/ApiIndex" element={<ApiIndex/>} />

            {/* Routes using sidebar layout */}
            <Route
              path="/dashboard"
              element={
                <SidebarLayout>
                  <DashboardPage />
                </SidebarLayout>
              }
            />
            <Route
              path="/project-uplodation"
              element={
                <SidebarLayout>
                  <ProjectUplodation />
                </SidebarLayout>
              }
            />
            <Route
              path="/upload-component"
              element={
                <SidebarLayout>
                  <UploadComponentPage />
                </SidebarLayout>
              }
            />
            <Route
              path="/profile/settings"
              element={
                <SidebarLayout>
                  <ProfileSettingsPage />
                </SidebarLayout>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
