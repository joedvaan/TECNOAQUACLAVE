import React, { useState, useEffect } from "react"; // 👉 React + hooks (estado y efectos automáticos)
import { useNavigate } from "react-router-dom"; // 👉 Permite navegar entre páginas
import "../styles/home.css"; // 👉 Importa estilos CSS

function Home() {
  const navigate = useNavigate(); // 👉 Función para redireccionar rutas

  const slides = [ // 👉 Arreglo con datos del carrusel
    {
      img: "/img/electricidad.jpg", // 👉 Ruta de imagen
      texto: "Servicio eléctrico rápido y seguro ⚡", // 👉 Texto de la imagen
    },
    {
      img: "/img/plomeria.jpg",
      texto: "Soluciones de plomería sin fugas 🚰",
    },
    {
      img: "/img/cerrajeria.jpg",
      texto: "Cerrajería confiable 24/7 🔐",
    },
  ];

  const [index, setIndex] = useState(0); 
  // 👉 index = posición actual del carrusel
  // 👉 setIndex = función para cambiar la posición

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      // 👉 Avanza automáticamente
      // 👉 % slides.length hace que vuelva al inicio
    }, 4000); // 👉 Cada 4 segundos cambia

    return () => clearInterval(interval); 
    // 👉 Limpia el intervalo para evitar errores
  }, [slides.length]); // 👉 Se ejecuta si cambia el número de slides

  return (
    <div className="home"> {/* 👉 Contenedor principal */}

      {/* 🔷 HERO PRINCIPAL */}
      <section className="hero">
        <h1>Soluciones profesionales para tu hogar </h1> {/* 👉 Título principal */}
        <p>
          Electricidad, plomería y cerrajería con atención rápida, segura y garantizada.
        </p> {/* 👉 Descripción */}

        <button
          className="btn-hero"
          onClick={() => navigate("/reserva")} 
          // 👉 Al hacer click va a la página de reservas
        >
           Reservar ahora
        </button>
      </section>

      {/* 🎠 CARRUSEL */}
      <section className="carousel">

        <div className="carousel-container">

          {/* BOTÓN IZQUIERDA */}
          <button
            className="carousel-btn left"
            onClick={() =>
              setIndex((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
              )
            }
            // 👉 Si está en la primera → va a la última
            // 👉 Si no → retrocede una
          >
            ←
          </button>

          {/* IMAGEN */}
          <img
            src={slides[index].img} 
            // 👉 Muestra la imagen según el index actual
            alt="servicio"
            className="carousel-img"
          />

          {/* BOTÓN DERECHA */}
          <button
            className="carousel-btn right"
            onClick={() =>
              setIndex((prev) =>
                (prev + 1) % slides.length
              )
            }
            // 👉 Avanza a la siguiente imagen
          >
            →
          </button>

        </div>

        {/* TEXTO */}
        <p className="carousel-text">
          {slides[index].texto}
          {/* 👉 Muestra el texto correspondiente a la imagen */}
        </p>

      </section>

      {/* 🛠 SERVICIOS */}
      <section className="services">
        <h2>Nuestros servicios</h2>

        <div className="services-grid">
          <div
            className="card"
            onClick={() => navigate("/servicio/electricidad")}
            // 👉 Redirige a detalle de electricidad
          >
            ⚡
            <h3>Electricidad</h3>
            <p>Instalaciones, mantenimiento y reparación eléctrica</p>
          </div>

          <div
            className="card"
            onClick={() => navigate("/servicio/plomeria")}
            // 👉 Redirige a plomería
          >
            🚰
            <h3>Plomería</h3>
            <p>Fugas, destapes e instalaciones hidráulicas</p>
          </div>

          <div
            className="card"
            onClick={() => navigate("/servicio/cerrajeria")}
            // 👉 Redirige a cerrajería
          >
            🔐
            <h3>Cerrajería</h3>
            <p>Aperturas, cambios de cerraduras y seguridad</p>
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIOS */}
      <section className="testimonials">
        <h2>Lo que dicen nuestros clientes</h2>

        <div className="testimonials-grid">
          <div className="test-card">“Excelente servicio, muy rápido 👌”</div> {/* 👉 Opinión */}
          <div className="test-card">“Me solucionaron todo en minutos 🚰”</div>
          <div className="test-card">“Muy confiables 💯”</div>
        </div>
      </section>

    </div>
  );
}

export default Home; // 👉 Exporta el componente para usarlo en App.js