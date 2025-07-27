
import { useState } from 'react';
import { Component, Folder, FileText, Package, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    icon: Component,
    label: 'UI Components',
    href: 'work1\src\pages\ComponentsPage.tsx'
  },
  {
    icon: Folder,
    label: 'Projects',
    href: '/projects'
  },
  {
    icon: FileText,
    label: 'Templates',
    href: '/templates'
  },
  {
    icon: Package,
    label: 'UI Kits',
    href: '/ui-kits'
  },
  {
    icon: PlayCircle,
    label: 'Playground',
    href: '/playground',
    active: true
  }
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "h-screen bg-gray-900/50 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-searchifi-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Searchifi
              </span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-3 rounded-xl transition-all duration-200 group",
                  item.active
                    ? "bg-glass-gradient border border-violet-500/20 text-white shadow-lg shadow-violet-500/10"
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">User</p>
              <p className="text-xs text-gray-400 truncate">user@searchifi.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
