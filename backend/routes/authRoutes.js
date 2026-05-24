const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mailer");


// ======================================================
// 📝 REGISTRO DE USUARIO
// ======================================================
router.post("/register", async (req, res) => {
  try {
    const {
      nombre,
      tipoDocumento,
      cedula,
      email,
      password,
    } = req.body;

    // ==========================
    // VALIDAR CAMPOS VACÍOS
    // ==========================
    if (
      !nombre ||
      !tipoDocumento ||
      !cedula ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios",
      });
    }

    // ==========================
    // VALIDAR EMAIL
    // ==========================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        msg: "Correo inválido",
      });
    }

    // ==========================
    // VALIDAR PASSWORD
    // ==========================
    if (password.length < 6) {
      return res.status(400).json({
        msg: "La contraseña debe tener mínimo 6 caracteres",
      });
    }

    // ==========================
    // VALIDAR CÉDULA
    // ==========================
    if (!/^\d+$/.test(cedula)) {
      return res.status(400).json({
        msg: "La cédula debe ser numérica",
      });
    }

    // ==========================
    // VERIFICAR USUARIO EXISTENTE
    // ==========================
    const existeUsuario = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { cedula },
      ],
    });

    if (existeUsuario) {
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    }

    // ==========================
    // ENCRIPTAR CONTRASEÑA
    // ==========================
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // ==========================
    // CREAR NUEVO USUARIO
    // ==========================
    const nuevoUsuario = new User({
      nombre,
      tipoDocumento,
      cedula,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // ==========================
    // GUARDAR EN MONGO
    // ==========================
    await nuevoUsuario.save();

    // ==========================
    // RESPUESTA EXITOSA
    // ==========================
    res.status(201).json({
      msg: "Usuario registrado correctamente ✅",
    });

  } catch (error) {
    console.error("ERROR REGISTER:", error);

    res.status(500).json({
      msg: "Error del servidor",
    });
  }
});


// ======================================================
// 🔐 LOGIN
// ======================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==========================
    // VALIDAR CAMPOS
    // ==========================
    if (!email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    // ==========================
    // BUSCAR USUARIO
    // ==========================
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "Usuario no existe",
      });
    }

    // ==========================
    // VALIDAR PASSWORD
    // ==========================
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    // ==========================
    // LOGIN EXITOSO
    // ==========================
    res.status(200).json({
      msg: "Login exitoso ✅",
      user,
      token: "fake-jwt",
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error);

    res.status(500).json({
      message: "Error en login",
    });
  }
});


// ======================================================
// 📧 RECUPERAR CONTRASEÑA
// ======================================================
router.post("/recuperar", async (req, res) => {
  try {
    const { email } = req.body;

    // ==========================
    // VALIDAR EMAIL
    // ==========================
    if (!email) {
      return res.status(400).json({
        message: "Correo requerido",
      });
    }

    // ==========================
    // BUSCAR USUARIO
    // ==========================
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no existe",
      });
    }

    // ==========================
    // GENERAR TOKEN
    // ==========================
    const token = Math.random()
      .toString(36)
      .substring(2);

    user.resetToken = token;

    user.resetTokenExpire =
      Date.now() + 3600000;

    await user.save();

    // ==========================
    // LINK RESET
    // ==========================
    const resetLink =
      `http://localhost:3000/reset/${token}`;

    // ==========================
    // ENVIAR EMAIL
    // ==========================
    const info = await transporter.sendMail({
      from: `"Soporte TecnoAquaClave" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>Recuperar contraseña</h2>

          <p>
            Haz clic en el botón para restablecer tu contraseña
          </p>

          <a
            href="${resetLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#0d6efd;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Restablecer contraseña
          </a>

          <p style="margin-top:20px;">
            Este enlace expira en 1 hora.
          </p>
        </div>
      `,
    });

    console.log("📨 EMAIL:", info.response);

    res.status(200).json({
      message: "Correo enviado correctamente",
    });

  } catch (error) {
    console.error("ERROR EMAIL:", error);

    res.status(500).json({
      message: "Error al enviar el correo",
    });
  }
});


// ======================================================
// 🔄 RESET PASSWORD
// ======================================================
router.post("/reset/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    // ==========================
    // VALIDAR PASSWORD
    // ==========================
    if (!password) {
      return res.status(400).json({
        message: "Contraseña requerida",
      });
    }

    // ==========================
    // BUSCAR TOKEN
    // ==========================
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token inválido o expirado",
      });
    }

    // ==========================
    // ENCRIPTAR PASSWORD
    // ==========================
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      password,
      salt
    );

    // ==========================
    // LIMPIAR TOKEN
    // ==========================
    user.resetToken = null;
    user.resetTokenExpire = null;

    await user.save();

    res.status(200).json({
      message: "Contraseña actualizada correctamente ✅",
    });

  } catch (error) {
    console.error("ERROR RESET:", error);

    res.status(500).json({
      message: "Error al actualizar contraseña",
    });
  }
});


// ======================================================
// EXPORTAR ROUTER
// ======================================================
module.exports = router;