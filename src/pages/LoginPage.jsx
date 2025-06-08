import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

// InputField is a reusable component for rendering input fields with consistent styling and behavior.
import InputField from "../components/ui/inputField";
import SubmitButton from "../components/ui/SubmitButton";
import BackToSelectionButton from "../components/ui/BackToSelectionButton";


export default function LoginPage() {
  const { login } = useAuth(); // en vez de setToken
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.email, form.password);
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white transition-opacity duration-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 shadow-lg rounded-xl bg-indigo-50">
       <BackToSelectionButton />
        <h2 className="text-xl font-semibold mb-4 text-center">Iniciar sesión</h2>
        <InputField
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo"
          autoComplete="email"
        />
        <InputField
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          autoComplete="current-password"
        />
        <SubmitButton loading={loading} text="Entrar" loadingText="Ingresando..." />
      </form>
    </div>
  );
}
