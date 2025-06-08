import { useState } from "react";
import  useAuth  from "../hooks/useAuth.js"

export default function CreateServicePage() {
    
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationMinutes: "",
    customFields: [],
  });
  
  const [newField, setNewField] = useState({ label: "", type: "select", options: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddField = () => {
  if (!newField.label.trim() || !newField.options.trim()) {
    alert("Debes completar la etiqueta y las opciones");
    return;
  }

  const options = newField.options.split(",").map((opt) => opt.trim());
  setForm({
    ...form,
    customFields: [...form.customFields, { ...newField, options }],
  });
  setNewField({ label: "", type: "select", options: "" });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        durationMinutes: Number(form.durationMinutes),
        customFields: form.customFields.filter(f => f.label.trim() && f.options.length > 0),
    }),
    });

    if (res.ok) {
      alert("Servicio creado exitosamente");
      setForm({
        name: "",
        description: "",
        price: "",
        durationMinutes: "",
        customFields: [],
      });
    } else {
      const err = await res.json();
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Servicio</h2>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
      <input name="durationMinutes" type="number" placeholder="Duración (min)" value={form.durationMinutes} onChange={handleChange} required />

      <h4>Campos personalizados</h4>
      <input placeholder="Etiqueta" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} />
      <input placeholder="Opciones (coma separadas)" value={newField.options} onChange={(e) => setNewField({ ...newField, options: e.target.value })} />
      <button type="button" onClick={handleAddField}>Agregar campo</button>

      <button type="submit">Crear Servicio</button>
      <ul>
        {form.customFields.map((field, idx) => (
            <li key={idx}>
            <strong>{field.label}</strong>: {field.options.join(", ")}
            </li>
        ))}
    </ul>

    </form>
    
  );
}
