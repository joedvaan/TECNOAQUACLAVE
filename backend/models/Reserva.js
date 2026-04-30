const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  tecnico: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Reserva", reservaSchema);
