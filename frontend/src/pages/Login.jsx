import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarga
    // Aquí puedes manejar la lógica de autenticación
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-page">
      <main className="login-content">
        <div className="login-card">
          <h2>Inicio de sesión</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              required
            />

            <label htmlFor="password">Contraseña</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="submit-btn">
              Entrar
            </button>
          </form>

          <div className="login-links">
            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
            <p>
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;