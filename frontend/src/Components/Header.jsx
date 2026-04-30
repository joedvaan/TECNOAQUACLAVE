import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // 🔐 Obtener usuario
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    user = null;
  }

  // 🧠 MENSAJE SEGÚN HORA
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Buenos días ☀️";
    if (hour < 18) return "Buenas tardes 🌤️";
    return "Buenas noches 🌙";
  };

  // ⏳ OCULTAR BIENVENIDA AUTOMÁTICAMENTE
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000); // ⏱ 4 segundos

      return () => clearTimeout(timer);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* 🔥 BIENVENIDA NIVEL APP */}
      {user && showWelcome && (
        <div className="welcome-pro">
          <span>
            {getGreeting()}, <strong>{user.nombre}</strong> 👋
          </span>
        </div>
      )}

      <header className="header">
        
        {/* 🔷 LOGO */}
        <div className="header-left">
          <img src="/logo.png" alt="logo" className="logo" />
          <h2>TECNOAQUACLAVE</h2>
        </div>

        {/* 🔷 DERECHA */}
        <div className="header-right">

          {user ? (
            <div className="user-box" onClick={() => setOpen(!open)}>
              
              <div className="avatar">
                {user.nombre?.charAt(0).toUpperCase() || "U"}
              </div>

              <span className="user-name">
                {user.nombre}
              </span>

              {open && (
                <div className="dropdown-menu-pro">
                  <Link to="/"> Inicio</Link>
                  <Link to="/Mis-Reservas"> Mis Reservas</Link>
                  <Link to="/registro">Registro</Link>
                  <button onClick={logout}>🚪 Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <div className="login-dropdown">
              <button className="login-btn">
                👤 Ingresa aquí ▼
              </button>

              <div className="dropdown-menu">
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/registro">Registrarse</Link>
                <Link to="/mis-reservas"> Mis Reservas</Link>
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
}

export default Header;