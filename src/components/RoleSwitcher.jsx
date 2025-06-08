import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function RoleSwitcher() {
  const { user, switchRole } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user || !user.roles.includes("client") || !user.roles.includes("provider")) return null;

  const otherRole = user.activeRole === "provider" ? "client" : "provider";

  const handleSwitch = async () => {
    setLoading(true);
    try {
      await switchRole(otherRole);
    } catch (err) {
      console.error("Error al cambiar de rol", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={loading}
      className="text-sm text-primary underline"
    >
      Cambiar a modo {otherRole === "provider" ? "Proveedor" : "Cliente"}
    </button>
  );
}
