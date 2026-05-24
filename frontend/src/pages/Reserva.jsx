import React, { useState } from "react";
import "../styles/reserva.css";

function Reserva() {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    servicio: "",
    tecnico: "",
  });

  const [loading, setLoading] = useState(false);

  // ============================
  // 📥 MANEJO DE INPUTS
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // 🚀 ENVIAR RESERVA
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDACIÓN EXTRA (evita errores backend)
    if (!formData.fecha || !formData.hora || !formData.servicio) {
      alert("Completa los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      console.log("📤 ENVIANDO:", formData);

      const res = await fetch("http://localhost:5000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al crear reserva");
        return;
      }

      // ✅ ALERT BONITO (puedes luego cambiar por toast)
      alert("✅ Reserva creada correctamente");

      // 🔄 RESET FORM
      setFormData({
        nombre: "",
        fecha: "",
        hora: "",
        servicio: "",
        tecnico: "",
      });

    } catch (error) {
      console.error("❌ ERROR:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // 🎨 UI
  // ============================
  return (
    <div className="reserva-container">
      <h2>Reserva tu Servicio</h2>

      <form onSubmit={handleSubmit} className="reserva-form">

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />

        <label>Servicio</label>
        <select
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un servicio</option>
          <option value="Electricidad">Electricidad</option>
          <option value="Plomería">Plomería</option>
          <option value="Cerrajería">Cerrajería</option> {/* ✅ CORRECTO */}
        </select>

        <label>Técnico</label>
        <select
          name="tecnico"
          value={formData.tecnico}
          onChange={handleChange}
        >
          <option value="">Selecciona técnico</option>
          <option value="Johan Valencia">Johan Valencia</option>
          <option value="Sofía Nova">Sofía Nova</option>
          <option value="Laura López">Laura López</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Reservar"}
        </button>

      </form>
    </div>
  );
}

export default Reserva;