import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import InputField from "../components/ui/InputField";
import SubmitButton from "../components/ui/SubmitButton";
import BackToSelectionButton from "../components/ui/BackToSelectionButton";
import { registerSchema } from "../validations/authSchemas";
import GoogleRegisterButton from "../components/ui/GoogleRegisterButton";

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

  const validateForm = (form) => {
  try {
    registerSchema.parse(form);
    return []; // ← Vacío si no hay errores
  } catch (err) {
    if (err.errors) {
      return err.errors.map((e) => e.message);
    }
    return ["Error desconocido en validación"];
  }
};



  const handleSubmit = async (e) => {
  if (!e.target.checkValidity()) {
    return; // Deja que el navegador muestre los errores nativos
  }

  e.preventDefault(); // ✅ Ahora sí lo bloqueas si pasa HTML5
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
        <GoogleRegisterButton /> {/* ← Aquí se integra el botón */}

        <InputField name="name" type="text" value={form.name} onChange={handleChange} placeholder="Nombre" />
        <InputField
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo"
          autoComplete="off"
          minLength={6}
        />
        <InputField
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          autoComplete="new-password"
          minLength={6}
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
