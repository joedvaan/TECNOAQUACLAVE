import React, { useState, useEffect, useRef } from "react";
import "../styles/reserva.css";

function Reserva() {
  const initialForm = {
    nombre: "",
    fecha: "",
    hora: "",
    servicio: "",
    tecnico: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [confirmacion, setConfirmacion] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [reservaId, setReservaId] = useState(null);

  const formRef = useRef();

  // 🔐 Cargar usuario
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined" || storedUser === "null") return;

      const user = JSON.parse(storedUser);
      if (user?.nombre) {
        setForm((prev) => ({
          ...prev,
          nombre: user.nombre,
        }));
      }
    } catch (error) {
      console.error("❌ Error leyendo user:", error);
    }
  }, []);

  // 📥 Cargar reservas existentes
  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/reservas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setReservas(data.reservas || []);
        }
      } catch (error) {
        console.error("Error cargando reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  // 🔄 CAMBIOS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 ENVIAR / EDITAR
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠️ Debes iniciar sesión");
      return;
    }

    if (!form.nombre || !form.fecha || !form.hora || !form.servicio || !form.tecnico) {
      alert("⚠️ Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const url = editando
        ? `http://localhost:5000/api/reservas/${reservaId}`
        : "http://localhost:5000/api/reservas";

      const method = editando ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "❌ Error al guardar reserva");
        return;
      }

      setConfirmacion(data.reserva || form);

      // Actualizar lista
      if (editando) {
        setReservas((prev) =>
          prev.map((r) => (r._id === reservaId ? data.reserva : r))
        );
      } else {
        setReservas((prev) => [...prev, data.reserva]);
      }

      // Reset
      setForm({ ...initialForm, nombre: form.nombre });
      setEditando(false);
      setReservaId(null);

      if (formRef.current) formRef.current.reset();

    } catch (error) {
      console.error("ERROR:", error);
      alert("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Cargar reserva en formulario
  const cargarReserva = (reserva) => {
    setForm({
      nombre: reserva.nombre,
      fecha: reserva.fecha,
      hora: reserva.hora,
      servicio: reserva.servicio,
      tecnico: reserva.tecnico,
    });
    setReservaId(reserva._id);
    setEditando(true);
  };

  // ❌ Cancelar reserva
  const cancelarReserva = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("¿Seguro que deseas cancelar esta reserva?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setReservas((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert("❌ Error al cancelar reserva");
      }
    } catch (error) {
      console.error("Error cancelando reserva:", error);
    }
  };

  return (
    <div className="reserva-page">
      <div className="reserva-card">
        <h2>{editando ? "Editar Reserva" : "Reserva tu Servicio"}</h2>

        <form ref={formRef} className="reserva-form" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Escribe tu nombre"
          />

          <label>Fecha</label>
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />

          <label>Hora</label>
          <input type="time" name="hora" value={form.hora} onChange={handleChange} />

          <label>Servicio</label>
          <select name="servicio" value={form.servicio} onChange={handleChange}>
            <option value="">Selecciona servicio</option>
            <option value="Electricidad">Electricidad</option>
            <option value="Plomería">Plomería</option>
            <option value="Cerrajería">Cerrajería</option>
          </select>

          <label>Técnico</label>
          <select name="tecnico" value={form.tecnico} onChange={handleChange}>
            <option value="">Selecciona técnico</option>
            <option value="Johan Valencia">Johan Valencia</option>
            <option value="Laura López">Laura López</option>
            <option value="Sofía Nova">Sofía Nova</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : editando ? "Actualizar Reserva" : "Confirmar Reserva"}
          </button>
        </form>

        {/* 🎉 MODAL */}
        {confirmacion && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>✅ Reserva Confirmada</h3>
              <p><strong>Nombre:</strong> {confirmacion.nombre}</p>
              <p><strong>Fecha:</strong> {confirmacion.fecha}</p>
              <p><strong>Hora:</strong> {confirmacion.hora}</p>
              <p><strong>Servicio:</strong> {confirmacion.servicio}</p>
              <p><strong>Técnico:</strong> {confirmacion.tecnico}</p>
              <button className="close-btn" onClick={() => setConfirmacion(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>

      {/* 📋 LISTA DE RESERVAS */}
      <div className="lista-reservas">
        <h2>Mis Reservas</h2>
        {reservas.length === 0 ? (
          <p>No tienes reservas registradas.</p>
        ) : (
          <ul>
            {reservas.map((reserva) => (
              <li key={reserva._id}>
                <strong>{reserva.servicio}</strong> - {reserva.fecha} {reserva.hora} con {reserva.tecnico}
                <div className="acciones">
                  <button 
                    className="btn-editar" 
                    onClick={() => cargarReserva(reserva)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn-cancelar" 
                    onClick={() => cancelarReserva(reserva._id)}
                  >
                    ❌ Cancelar Reserva
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reserva;
