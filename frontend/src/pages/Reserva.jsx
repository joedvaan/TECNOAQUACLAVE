import React, { useState } from "react";
import "../styles/reserva.css";

function Reserva() {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    servicio: "",
    tecnico: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.nombre && form.fecha && form.hora && form.servicio && form.tecnico) {
      setSubmitted(true);
    }
  };

  return (
    <div className="reserva-page">
      <div className="reserva-card">
        <h2>Reserva tu Servicio</h2>
        <form className="reserva-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
          />

          <label htmlFor="fecha">Fecha</label>
          <input
            id="fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <label htmlFor="hora">Hora</label>
          <input
            id="hora"
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
          />

          <label htmlFor="servicio">Tipo de servicio</label>
          <select
            id="servicio"
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
          >
            <option value="">Selecciona...</option>
            <option value="Cerrajería">Cerrajería</option>
            <option value="Plomería">Plomería</option>
            <option value="Electricidad">Electricidad</option>
          </select>

          <label htmlFor="tecnico">Técnico</label>
          <select
            id="tecnico"
            name="tecnico"
            value={form.tecnico}
            onChange={handleChange}
          >
            <option value="">Selecciona...</option>
            <option value="Johan Valencia">Johan Valencia</option>
            <option value="Laura Lopez">Laura Lopez</option>
            <option value="Edwuar Castellanos">Edwuar Castellanos</option>
            <option value="Sofia Nova">Sofia Nova</option>
          </select>

          <button type="submit">Confirmar Reserva</button>
        </form>

        {submitted && (
          <div className="reserva-confirmacion">
            <h3>¡Reserva confirmada 🎉!</h3>
            <p><strong>Nombre:</strong> {form.nombre}</p>
            <p><strong>Fecha:</strong> {form.fecha}</p>
            <p><strong>Hora:</strong> {form.hora}</p>
            <p><strong>Servicio:</strong> {form.servicio}</p>
            <p><strong>Técnico:</strong> {form.tecnico}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reserva;