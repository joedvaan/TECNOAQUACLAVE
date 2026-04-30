import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/registro.css";

const API = "http://localhost:5000/api/auth/register";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    tipoDocumento: "Cédula de ciudadanía",
    cedula: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // validaciones
  const validar = () => {
    if (
      !form.nombre ||
      !form.tipoDocumento ||
      !form.cedula ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Correo inválido");
      return false;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    if (!/^\d+$/.test(form.cedula)) {
      setError("La cédula debe ser numérica");
      return false;
    }

    return true;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validar()) return;

    try {
      setLoading(true);

      const res = await axios.post(API, {
        nombre: form.nombre,
        tipoDocumento: form.tipoDocumento,
        cedula: form.cedula,
        email: form.email,
        password: form.password
      });

      setSuccess(res.data.msg || "Registro exitoso ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.msg || "Error al registrar");
      } else {
        setError("No se pudo conectar con el servidor");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2>Crear cuenta</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit} className="registro-form">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
          />

          <select
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
          >
            <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
            <option value="Tarjeta de identidad">Tarjeta de identidad</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>

          <input
            type="text"
            name="cedula"
            placeholder="Número de documento"
            value={form.cedula}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>

        </form>

        <p className="registro-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;