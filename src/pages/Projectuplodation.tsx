// src/pages/DashboardPage.tsx
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import UploadProjectPage from "./ProjectsSections/UploadProjectPage";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="w-full mr-[1000px] max-w-full">
      <div className="flex flex-col flex-1">
        <header className="flex h-16 -mt-1 items-center gap-4 border-b px-6 bg-background">
          <div className="flex-1">
            <h1 className="text-2xl  font-bold">Dashboard</h1>
            <p className="">Welcome back, {user?.name || "User"}!</p>
          </div>
        </header>

        <main className="flex-1  overflow-auto p-6">
         <UploadProjectPage/>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
