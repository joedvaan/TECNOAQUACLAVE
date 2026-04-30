import React, { useState } from "react"; // 👉 React + estado
import { Link } from "react-router-dom"; // 👉 Para navegar sin recargar
import "../styles/login.css"; // 👉 Estilos del login

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // 👉 Estado para mostrar/ocultar contraseña

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👉 Evita que la página se recargue

    const email = e.target.email.value; 
    const password = e.target.password.value;
    // 👉 Obtiene los valores del formulario

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", // 👉 Método POST para enviar datos
        headers: {
          "Content-Type": "application/json", // 👉 Indicamos que enviamos JSON
        },
        body: JSON.stringify({ email, password }), 
        // 👉 Convertimos datos a JSON
      });

      const data = await res.json();
      // 👉 Convertimos la respuesta del backend a objeto

      if (!res.ok) {
      alert(data.message);
      return;
       // 👉 Muestra error si login falla
      
      }

      // ✅ GUARDAR DATOS EN EL NAVEGADOR
    localStorage.setItem("token", data.token);
      // 👉 Guarda el token (para autenticación)

    localStorage.setItem("user", JSON.stringify(data.user));
      // 👉 Guarda el usuario (IMPORTANTE para mostrar nombre en header)
      console.log("USER GUARDADO:", data.user);

      // 🔁 REDIRECCIÓN AL HOME
   window.location.href = "/"; 
      // 👉 Lleva al usuario al inicio después de login

    } catch (error) {
      console.error("Error:", error); // 👉 Muestra error en consola
      alert("No se pudo conectar con el servidor"); // 👉 Error de conexión
    }
  };

  return (
    <div className="login-page"> {/* 👉 Contenedor principal */}
      <main className="login-content">
        <div className="login-card">
          <h2>Inicio de sesión</h2> {/* 👉 Título */}

          <form className="login-form" onSubmit={handleSubmit}>
            {/* 👉 Formulario que ejecuta handleSubmit */}

            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              required
            />
            {/* 👉 Input de email */}

            <label htmlFor="password">Contraseña</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                // 👉 Cambia entre texto y contraseña
                placeholder="Tu contraseña"
                required
              />

              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                // 👉 Cambia el estado (mostrar/ocultar)
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="submit-btn">
              Entrar
            </button>
            {/* 👉 Botón que envía el formulario */}
          </form>

          <div className="login-links">
            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
            {/* 👉 Link a recuperación */}

            <p>
              ¿No tienes cuenta?{" "}
              <Link to="/registro">Regístrate aquí</Link>
              {/* 👉 Link a registro */}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login; // 👉 Exporta el componente