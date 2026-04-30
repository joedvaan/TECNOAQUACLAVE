import React, { useEffect, useState } from "react";
import "../styles/misReservas.css";

function MisReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // 🔥 DEBUG (CLAVE)
      console.log("📦 DATA DEL BACK:", data);

      if (res.ok) {
        // ✅ CORRECCIÓN AQUÍ
        setReservas(data);
      }

    } catch (error) {
      console.error("❌ ERROR FETCH:", error);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservas(prev => prev.filter(r => r._id !== id));

    } catch (error) {
      console.error("❌ ERROR DELETE:", error);
    }
  };

  return (
    <div className="mis-reservas-page">
      <h2>📅 Mis Reservas</h2>

      {reservas.length === 0 ? (
        <h3>No tienes reservas aún 😢</h3>
      ) : (
        <div className="reservas-grid">
          {reservas.map((r) => (
            <div key={r._id} className="reserva-card">
              <h3>{r.servicio}</h3>
              <p><strong>Nombre:</strong> {r.nombre}</p>
              <p><strong>Fecha:</strong> {r.fecha}</p>
              <p><strong>Hora:</strong> {r.hora}</p>
              <p><strong>Técnico:</strong> {r.tecnico}</p>

              <button onClick={() => eliminarReserva(r._id)}>
                ❌ Cancelar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisReservas;