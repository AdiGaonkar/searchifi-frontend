import {
  Home,
  FolderKanban,
  LayoutGrid,
  UploadCloud,
  Users,
  Settings,
  FlaskConical,
  Bot,
  PenTool,
  LogOut,
  File,
  Monitor,
  Smartphone,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AppSidebarProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export function AppSidebar({ onTabChange, activeTab }: AppSidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const currentPath = location.pathname;

  const isActive = (path: string, tab?: string) => {
    if (path === "/dashboard" && tab) {
      return currentPath === "/dashboard" && activeTab === tab;
    }
    if (path === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(path);
  };

  const handleItemClick = (item: any) => {
    if (item.tab && onTabChange) {
      onTabChange(item.tab);
    }
  };

  const navigationItems = [
    { title: "Home", url: "", icon: Home },
    { title: "Projects", url: "/websites", icon: FolderKanban },
    { title: "UI Kit", url: "/ComponentShowcase", icon: LayoutGrid, tab: "components" },
    { title: "Upload Project", url: "/project-uplodation", icon: UploadCloud },
    { title: "Our Community", url: "/community", icon: Users },
    { title: "API Tester", url: "/APItesterfile", icon: FlaskConical },
    { title: "AI Website Builder", url: "/ApiIndex", icon: Bot },
    { title: "Searchifi-web Builder", url: "/web-builder", icon: PenTool },
    { title: "Profile", url: "/profile/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 font-light min-h-screen bg-[#1A1A1A] text-white flex flex-col p-6 border-r border-white/10">
      {/* Brand */}
      <a href="/" className="mb-12 flex items-center gap-3 hover:opacity-80 transition">
        <img src="/SEarchifi.png" alt="Logo" className="h-8 w-8 object-contain" />
        <h1 className="text-2xl font-light font-Quicksand tracking-wide">TheSearchifi</h1>
      </a>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Section: Navigation */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Navigation
          </h4>
          <ul className="space-y-1">
            {/* Dropdown: Templates */}
            <li>
              <button
                onClick={() => setTemplatesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <File className="h-4 w-4" />
                  <span className="text-sm">Templates</span>
                </div>
                {templatesOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {templatesOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li>
                    <Link
                      to="/Websitetemplete"
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-colors ${isActive("/Websitetemplete") ? "bg-white/10" : ""
                        }`}
                    >
                      <Monitor className="h-4 w-4" />
                      Web Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates/mobile"
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-colors ${isActive("/templates/mobile") ? "bg-white/10" : ""
                        }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile Apps
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Static Items */}
            {navigationItems.map((item) => (
              <li key={item.title}>
                {item.tab ? (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-colors ${isActive(item.url, item.tab) ? "bg-white/10" : ""
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </button>
                ) : (
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-colors ${isActive(item.url) ? "bg-white/10" : ""
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Section: AI Assistant */}

      </div>

      {/* Footer: User Info and Logout */}
      <div className="space-y-4 mt-6 pt-6 border-t border-white/10">
        {user?.email && (
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <p className="text-sm truncate text-gray-300">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-white/5 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;
