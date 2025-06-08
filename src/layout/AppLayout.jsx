import { Outlet } from "react-router-dom";
import RoleSwitcher from "../components/RoleSwitcher";
import LogoutButton from "../components/LogoutButton";

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AppLayout() {
  const { user } = useAuth();

  const commonLinks = [
    { to: "/dashboard", label: "Inicio" },
  ];

  const providerLinks = [
    { to: "/services", label: "Mis Servicios" },
    { to: "/bookings", label: "Reservas" },
  ];

  const clientLinks = [
    { to: "/explore", label: "Explorar Servicios" },
    { to: "/my-bookings", label: "Mis Reservas" },
  ];

  const menuLinks =
    user?.activeRole === "provider"
      ? [...commonLinks, ...providerLinks]
      : [...commonLinks, ...clientLinks];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-lg font-bold">ServiceHub</h1>
        <nav className="flex gap-6 items-center">
          {menuLinks.map((item) => (
            <Link key={item.to} to={item.to} className="text-sm font-medium hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <RoleSwitcher />
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

