const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

/**
 * 
 */
router.post("/register", async (req, res) => {
  try {
    const {
      nombre,
      tipoDocumento,
      documento,
      email,
      password,
      confirmPassword,
    } = req.body;

    // ✅ Validaciones básicas
    if (!nombre || !tipoDocumento || !documento || !email || !password || !confirmPassword) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        ok: false,
        message: "Las contraseñas no coinciden",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const userExist = await User.findOne({
      $or: [{ email }, { documento }],
    });

    if (userExist) {
      return res.status(400).json({
        ok: false,
        message: "El usuario ya existe",
      });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      nombre,
      tipoDocumento,
      documento,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
    });

  } catch (error) {
    console.error("❌ Error en register:", error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
});


/**
 * 🔑 LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email y contraseña son obligatorios",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Usuario no existe",
      });
    }

 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        ok: false,
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      ok: true,
      message: "Login exitoso",
      token,
      user: {
        nombre: user.nombre,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
});


module.exports = router;