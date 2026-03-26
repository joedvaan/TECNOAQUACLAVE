import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/registro.css";

function Register() {
  const [form, setForm] = useState({
    nombre: "",
    tipoDocumento: "",
    documento: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.nombre &&
      form.tipoDocumento &&
      form.documento &&
      form.email &&
      form.password &&
      form.password === form.confirmPassword
    ) {
      setSubmitted(true);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Crear cuenta</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
          />

          <label htmlFor="tipoDocumento">Tipo de documento</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
          >
            <option value="">Selecciona...</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PAS">Pasaporte</option>
          </select>

          <label htmlFor="documento">Número de documento</label>
          <input
            id="documento"
            type="text"
            name="documento"
            value={form.documento}
            onChange={handleChange}
            placeholder="Ej: 123456789"
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
          />

          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
          />

          <button type="submit">Registrarse</button>
        </form>

        {submitted && (
          <div className="register-confirmacion">
            <h3>¡Registro exitoso 🎉!</h3>
            <p>Bienvenido, {form.nombre}</p>
            <p>
              Documento: {form.tipoDocumento} {form.documento}
            </p>
          </div>
        )}

        <div className="register-links">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/login">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;