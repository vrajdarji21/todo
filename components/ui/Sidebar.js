'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  Folder,
  Users,
  ChevronLeft,
  ChevronRight,
  FileText,
  ScrollText,
  UserCircle // New icon for Profile
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Tasks", icon: CheckSquare, href: "/tasks" },
  { name: "Projects", icon: Folder, href: "/projects" },
  { name: "Users", icon: Users, href: "/team" },
  { name: "EOD Reports", icon: FileText, href: "/eod" },
  { name: "Activity Logs", icon: ScrollText, href: "/logs" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  // New Profile Link
  { name: "Profile", icon: UserCircle, href: "/profile" }, 
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`bg-sidebar border-r border-t transition-all duration-300 flex flex-col fixed z-30 group ${
        !isOpen ? "w-16" : "w-64"
      }`}
      style={{
        top: "56px", 
        height: "calc(100vh - 56px)",
      }}
    >
      {/* NEW COLLAPSE BUTTON: 
          Positioned absolutely on the right border. 
          It sits "halfway" out of the sidebar.
      */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 z-40 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors relative group/item ${
                  active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${!isOpen ? "justify-center" : "justify-start"}`}
              >
                <item.icon className={`h-4 w-4 flex-shrink-0 transition-colors ${active ? 'text-blue-600' : ''}`} />
                
                {/* Label: Only visible when open */}
                <span className={`font-medium text-sm truncate transition-all duration-300 ${
                  isOpen ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 overflow-hidden ml-0"
                } ${active ? 'font-semibold' : ''}`}>
                  {item.name}
                </span>

                {/* Tooltip for collapsed state (Optional UX improvement) */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}