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
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // MANEJAR INPUTS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // VALIDACIONES
  // =========================
  const validar = () => {
    // limpiar errores anteriores
    setError("");

    if (
      !form.nombre.trim() ||
      !form.tipoDocumento.trim() ||
      !form.cedula.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    // validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Correo electrónico inválido");
      return false;
    }

    // validar contraseña
    if (form.password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres");
      return false;
    }

    // validar coincidencia
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    // validar documento numérico
    if (!/^\d+$/.test(form.cedula)) {
      setError("El número de documento debe ser numérico");
      return false;
    }

    return true;
  };

  // =========================
  // ENVIAR FORMULARIO
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // validar antes de enviar
    if (!validar()) return;

    try {
      setLoading(true);

      const response = await axios.post(API, {
        nombre: form.nombre.trim(),
        tipoDocumento: form.tipoDocumento,
        cedula: form.cedula.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      setSuccess(response.data.msg || "Registro exitoso ✅");

      // limpiar formulario
      setForm({
        nombre: "",
        tipoDocumento: "Cédula de ciudadanía",
        cedula: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // redireccionar
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Error de registro:", err);

      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
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

          {/* NOMBRE */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
          />

          {/* TIPO DOCUMENTO */}
          <select
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
          >
            <option value="Cédula de ciudadanía">
              Cédula de ciudadanía
            </option>

            <option value="Tarjeta de identidad">
              Tarjeta de identidad
            </option>

            <option value="Pasaporte">
              Pasaporte
            </option>
          </select>

          {/* DOCUMENTO */}
          <input
            type="text"
            name="cedula"
            placeholder="Número de documento"
            value={form.cedula}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          {/* CONFIRMAR PASSWORD */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {/* BOTÓN */}
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>

        </form>

        <p className="registro-link">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;