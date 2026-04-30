const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");


// ✅ GET TODAS LAS RESERVAS
router.get("/", async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    console.error("❌ ERROR GET:", error);
    res.status(500).json({ msg: "Error al obtener reservas" });
  }
});


// ✅ POST CREAR RESERVA
router.post("/", async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);

    const { nombre, fecha, hora, servicio, tecnico } = req.body;

    if (!nombre || !fecha || !hora || !servicio || !tecnico) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const nuevaReserva = new Reserva({
      nombre,
      fecha,
      hora,
      servicio,
      tecnico,
      usuario: nombre // 🔥 CLAVE
    });

    const guardada = await nuevaReserva.save();

    res.status(201).json({
      msg: "Reserva guardada",
      reserva: guardada
    });

  } catch (error) {
    console.error("❌ ERROR POST:", error);
    res.status(500).json({ msg: "Error al guardar reserva" });
  }
});

module.exports = router;