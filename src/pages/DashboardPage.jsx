import useAuth from "../hooks/useAuth";
import ProviderDashboard from "./ProviderDashboard";
import ClientDashboard from "./ClientDashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-10">Cargando usuario...</p>;

  return user.activeRole === "provider" ? (
    <ProviderDashboard />
  ) : (
    <ClientDashboard />
  );
}
