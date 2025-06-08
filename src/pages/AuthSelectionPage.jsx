import { Link } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function AuthSelectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Bienvenido a ServiceHub</h1>
        <p className="mb-6 text-gray-600">Selecciona una opción para continuar</p>
        <div className="flex flex-col gap-4">
          <PrimaryButton to="/login">Iniciar Sesión</PrimaryButton>
          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 py-2 rounded-xl hover:bg-indigo-50 transition text-center block"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
