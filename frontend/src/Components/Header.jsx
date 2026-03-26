import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="app-header">
     
      <div className="logo">
        <img src="./logo.png" alt="Logo" />
      </div>

      
      <h1 className="welcome-sign">¡Bienvenido a nuestra plataforma!</h1>

    
      <div className="menu">
        <button
          className={`welcome-btn ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          Ingresa aquí
          <span className={`arrow ${menuOpen ? "rotate" : ""}`}>▼</span>
        </button>

        <nav className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          <Link to="/login" onClick={closeMenu} className="menu-item">
            <span className="icon">👤</span> Inicio de sesión
          </Link>
          <Link to="/registro" onClick={closeMenu} className="menu-item">
            <span className="icon">✍️</span> Registro
          </Link>
          <Link to="/reserva" onClick={closeMenu} className="menu-item">
            <span className="icon">📅</span> Reserva
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;