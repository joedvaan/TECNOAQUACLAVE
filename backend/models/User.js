const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // 👈 evita correos duplicados
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  resetToken: {
    type: String,
    default: null, // 👈 evita undefined
  },

  resetTokenExpire: {
    type: Date,
    default: null, // 👈 opcional (para seguridad futura)
  },

}, {
  timestamps: true, // 👈 crea createdAt y updatedAt automáticamente
});

module.exports = mongoose.model("User", UserSchema);