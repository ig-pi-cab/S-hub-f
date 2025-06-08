import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import InputField from "../components/ui/InputField";
import SubmitButton from "../components/ui/SubmitButton";
import BackToSelectionButton from "../components/ui/BackToSelectionButton";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "provider",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, role } = form;

    if (!name.trim()) {
      toast.error("El nombre es obligatorio");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Correo inválido");
      return false;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (!["provider", "client"].includes(role)) {
      toast.error("Rol inválido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", form);
      await login(form.email, form.password);
      toast.success("Registro exitoso");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white transition-opacity duration-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 shadow-lg rounded-xl bg-indigo-50">
        <BackToSelectionButton />

        <h2 className="text-xl font-semibold mb-4 text-center">Crear cuenta</h2>

        <InputField name="name" type="text" value={form.name} onChange={handleChange} placeholder="Nombre" />
        <InputField
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo"
          autoComplete="off"
        />
        <InputField
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          autoComplete="new-password"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded border"
        >
          <option value="provider">Proveedor de servicios</option>
          <option value="client">Cliente</option>
        </select>

        <SubmitButton loading={loading} text="Registrarse" loadingText="Registrando..." />
      </form>
    </div>
  );
}
