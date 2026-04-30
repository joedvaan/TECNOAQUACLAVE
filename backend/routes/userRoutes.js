const express = require("express");
const router = express.Router();


let usuarios = [];

router.get("/", (req, res) => {
  res.json({
    ok: true,
    usuarios,
  });
});


router.get("/:id", (req, res) => {
  const usuario = usuarios.find(u => u.id === req.params.id);

  if (!usuario) {
    return res.status(404).json({
      ok: false,
      mensaje: "Usuario no encontrado",
    });
  }

  res.json({
    ok: true,
    usuario,
  });
});


router.post("/", (req, res) => {
  const { nombre, email } = req.body;

  // 🔒 Validación
  if (!nombre || !email) {
    return res.status(400).json({
      ok: false,
      mensaje: "Nombre y email son obligatorios",
    });
  }

  const nuevoUsuario = {
    id: Date.now().toString(),
    nombre,
    email,
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    ok: true,
    mensaje: "Usuario creado",
    usuario: nuevoUsuario,
  });
});


router.put("/:id", (req, res) => {
  const { nombre, email } = req.body;
  const index = usuarios.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "Usuario no encontrado",
    });
  }

  usuarios[index] = {
    ...usuarios[index],
    nombre: nombre || usuarios[index].nombre,
    email: email || usuarios[index].email,
  };

  res.json({
    ok: true,
    mensaje: "Usuario actualizado",
    usuario: usuarios[index],
  });
});


router.delete("/:id", (req, res) => {
  const index = usuarios.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "Usuario no encontrado",
    });
  }

  const eliminado = usuarios.splice(index, 1);

  res.json({
    ok: true,
    mensaje: "Usuario eliminado",
    usuario: eliminado[0],
  });
});

module.exports = router;