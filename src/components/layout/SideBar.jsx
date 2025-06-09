import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Settings, Users } from "lucide-react";
import SidebarLink from "./SidebarLink";
import useAuth from "@/hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = {
    client: [
      { label: "Inicio", icon: <Home />, path: "/dashboard" },
      { label: "Mis reservas", icon: <Users />, path: "/bookings" },
    ],
    provider: [
      { label: "Inicio", icon: <Home />, path: "/dashboard" },
      { label: "Mis servicios", icon: <Settings />, path: "/services" },
    ],
  };

  const itemsToShow = menuItems[user?.activeRole] || [];

  return (
    <aside className={`bg-white shadow-lg transition-all ${expanded ? 'w-60' : 'w-16'} hidden md:block`}>
      <div className="flex items-center justify-between p-4 border-b">
        <span className={`text-lg font-bold ${!expanded && 'hidden'}`}>ServiceHub</span>
        <button onClick={() => setExpanded(!expanded)}>
          <Menu size={20} />
        </button>
      </div>
      <nav className="p-2 space-y-2">
        {itemsToShow.map((item) => (
          <SidebarLink
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
            active={currentPath.startsWith(item.path)}
          />
        ))}
      </nav>
    </aside>
  );
}
