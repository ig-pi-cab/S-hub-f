import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { setTokenFromOAuth } = useAuth(); // Debes tener esto implementado

  useEffect(() => {
    if (token) {
      setTokenFromOAuth(token); // Guarda en localStorage/context
      toast.success("Inicio de sesión con Google exitoso");
      navigate("/dashboard");
    } else {
      toast.error("No se recibió token");
      navigate("/");
    }
  }, [token, navigate, setTokenFromOAuth]);

  return (
    <div className="h-screen flex justify-center items-center">
      <p className="text-lg text-gray-700">Procesando autenticación con Google...</p>
    </div>
  );
}
