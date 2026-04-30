const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const { nombre, tipoDocumento, cedula, email, password } = req.body;

    if (!nombre || !tipoDocumento || !cedula || !email || !password) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const existeEmail = await User.findOne({ email });
    if (existeEmail) return res.status(400).json({ msg: "Email ya existe" });

    const existeCedula = await User.findOne({ cedula });
    if (existeCedula) return res.status(400).json({ msg: "Cédula ya existe" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      tipoDocumento,
      cedula,
      email,
      password: hash
    });

    await user.save();

    res.json({ msg: "Usuario registrado" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error servidor" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuario no existe" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch {
    res.status(500).json({ msg: "Error servidor" });
  }
});

module.exports = router;