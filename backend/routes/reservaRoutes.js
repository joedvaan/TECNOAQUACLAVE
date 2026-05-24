const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");

// =======================
// 📌 OBTENER TODAS LAS RESERVAS
// =======================
router.get("/", async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    console.error("ERROR OBTENER RESERVAS:", error);
    res.status(500).json({ message: "Error al obtener reservas" });
  }
});

// =======================
// ➕ CREAR RESERVA (CORREGIDO)
// =======================
router.post("/", async (req, res) => {
  try {
    console.log("📥 DATOS RECIBIDOS:", req.body);

    let { nombre, fecha, hora, servicio, tecnico } = req.body;

    // 🔧 LIMPIEZA DE DATOS (evita undefined)
    nombre = nombre || "Cliente";
    servicio = servicio || "General";
    tecnico = tecnico || "No asignado";

    // 🔒 VALIDACIÓN REAL
    if (!fecha || !hora) {
      return res.status(400).json({
        message: "Fecha y hora son obligatorias",
      });
    }

    const nuevaReserva = new Reserva({
      nombre,
      fecha,
      hora,
      servicio,
      tecnico,
    });

    const reservaGuardada = await nuevaReserva.save();

    console.log("✅ RESERVA GUARDADA:", reservaGuardada);

    res.status(201).json(reservaGuardada);

  } catch (error) {
    console.error("❌ ERROR CREAR RESERVA:", error);

    res.status(500).json({
      message: "Error al crear reserva",
      error: error.message, // 👈 útil para debug
    });
  }
});

// =======================
// ✏️ EDITAR RESERVA
// =======================
router.put("/:id", async (req, res) => {
  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reservaActualizada) {
      return res.status(404).json({
        message: "Reserva no encontrada",
      });
    }

    res.json(reservaActualizada);

  } catch (error) {
    console.error("❌ ERROR EDITAR:", error);
    res.status(500).json({
      message: "Error al actualizar reserva",
    });
  }
});

// =======================
// ❌ CANCELAR RESERVA
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);

    if (!reserva) {
      return res.status(404).json({
        message: "Reserva no encontrada",
      });
    }

    res.json({
      message: "Reserva cancelada correctamente",
    });

  } catch (error) {
    console.error("❌ ERROR CANCELAR:", error);
    res.status(500).json({
      message: "Error al cancelar reserva",
    });
  }
});

module.exports = router;