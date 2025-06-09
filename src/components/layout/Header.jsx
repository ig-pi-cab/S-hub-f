import LogoutButton from "../LogoutButton";
import RoleSwitcher from "../RoleSwitcher";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white p-4 border-b flex justify-between items-center">
      <span className="text-sm text-gray-600">Sesión: {user?.name}</span>
      <div className="flex items-center gap-4">
        <RoleSwitcher />
        <LogoutButton />
      </div>
    </header>
  );
}
