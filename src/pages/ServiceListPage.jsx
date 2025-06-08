import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function ServiceListPage() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setServices(data.services))
      .catch((err) => console.error("Error fetching services:", err.message));
  }, [token]);

  return (
    <div>
      <h2>Mis Servicios</h2>
      <ul>
        {services.map((s) => (
          <li key={s._id}>{s.name} - ${s.price}</li>
        ))}
      </ul>
    </div>
  );
}
