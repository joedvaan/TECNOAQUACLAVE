const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongo conectado"))
  .catch(err => console.log(err));

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reservas", require("./routes/reservaRoutes"));

app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en puerto 5000");
});
