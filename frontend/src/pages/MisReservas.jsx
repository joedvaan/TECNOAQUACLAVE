import React, { useEffect, useState } from "react";
import "../styles/misReservas.css";

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 NUEVOS ESTADOS
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // ============================
  // 🔄 OBTENER RESERVAS
  // ============================
  const fetchReservas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reservas");
      const data = await res.json();

      setReservas(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
      setReservas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  // ============================
  // ❌ CANCELAR
  // ============================
  const cancelarReserva = async (id) => {
    if (!window.confirm("¿Cancelar esta reserva?")) return;

    try {
      await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: "DELETE",
      });

      setReservas(reservas.filter(r => r._id !== id));
      mostrarMensaje("Reserva cancelada correctamente ❌");

    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // ✏️ ABRIR MODAL
  // ============================
  const abrirEditar = (reserva) => {
    setReservaEditando(reserva);
    setModalOpen(true);
  };

  // ============================
  // 💾 GUARDAR EDICIÓN
  // ============================
  const guardarEdicion = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reservas/${reservaEditando._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservaEditando),
        }
      );

      const data = await res.json();

      setReservas(reservas.map(r =>
        r._id === data._id ? data : r
      ));

      setModalOpen(false);
      mostrarMensaje("Reserva actualizada correctamente ✏️");

    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // 🔔 ALERTA BONITA
  // ============================
  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 3000);
  };

  if (loading) return <p style={{ color: "white" }}>Cargando...</p>;

  return (
    <div className="mis-reservas-container">

      {/* 🔔 ALERTA BONITA */}
      {mensaje && <div className="alerta">{mensaje}</div>}

      <h2 className="titulo">Mis Reservas</h2>

      <div className="grid-reservas">
        {reservas.map((r) => (
          <div className="card-reserva" key={r._id}>

            <div className="card-header">
              <h3>{r.servicio}</h3>
            </div>

            <div className="card-body">
              <p><strong>👤</strong> {r.nombre}</p>
              <p><strong>📅</strong> {r.fecha}</p>
              <p><strong>⏰</strong> {r.hora}</p>
              <p><strong>🛠</strong> {r.tecnico}</p>
            </div>

            <div className="acciones">
              <button className="btn editar" onClick={() => abrirEditar(r)}>
                ✏️ Editar
              </button>

              <button className="btn cancelar" onClick={() => cancelarReserva(r._id)}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ============================
          🪟 MODAL EDITAR
      ============================ */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">

            <h3>Editar Reserva</h3>

            {/* SERVICIO */}
<select
  value={reservaEditando.servicio || ""}
  onChange={(e) =>
    setReservaEditando({ ...reservaEditando, servicio: e.target.value })
  }
>
  <option value="">Selecciona servicio</option>
  <option value="Electricidad">Electricidad</option>
  <option value="Plomería">Plomería</option>
  <option value="Mantenimiento">Cerrajeria</option>
  <option value="Instalación">Instalación</option>
</select>

{/* TÉCNICO */}
<select
  value={reservaEditando.tecnico || ""}
  onChange={(e) =>
    setReservaEditando({ ...reservaEditando, tecnico: e.target.value })
  }
>
  <option value="">Selecciona técnico</option>
  <option value="Sofía Nova">Sofía Nova</option>
  <option value="Carlos Pérez">Carlos Pérez</option>
  <option value="Juan Gómez">Juan Gómez</option>
</select>

            <input
              type="time"
              value={reservaEditando.hora}
              onChange={(e) =>
                setReservaEditando({ ...reservaEditando, hora: e.target.value })
              }
            />

            <input
              value={reservaEditando.servicio}
              onChange={(e) =>
                setReservaEditando({ ...reservaEditando, servicio: e.target.value })
              }
              placeholder="Servicio"
            />

            <input
              value={reservaEditando.tecnico}
              onChange={(e) =>
                setReservaEditando({ ...reservaEditando, tecnico: e.target.value })
              }
              placeholder="Técnico"
            />

            <div className="modal-buttons">
              <button onClick={guardarEdicion} className="btn editar">
                Guardar
              </button>

              <button onClick={() => setModalOpen(false)} className="btn cancelar">
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default MisReservas;