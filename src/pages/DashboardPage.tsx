// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProjectsPage, { Project } from "./ProjectsSections/ProjectsPage";
import Projectpagefordashboard from "@/components/Projectpagefordashboard";

const LoadingProjects = () => (
  <div className="p-8 mt-80 ml-[500px] text-center text-white">
    Loading projects...
  </div>
);

const NoProjects = () => (
  <div className="p-8 mt-80 ml-[500px] text-center text-white">
    No projects uploaded yet.
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/dashboard" } });
    }
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (!user) return null;
  if (loading) return <LoadingProjects />;
  if (!projects.length) return <NoProjects />;

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col flex-1">
        <main className="flex-1 -ml-10 overflow-auto p-6">
          <Projectpagefordashboard/>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
