import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  // =========================================
  // SLIDES
  // =========================================

  const slides = [
    {
      img: "/img/electricidad.jpg",
      texto: "Servicio eléctrico rápido y seguro ⚡",
    },
    {
      img: "/img/Plomeria.jpg",
      texto: "Plomería confiable y eficiente 🛠️",
    },
    {
      img: "/img/cerrajeria.jpg",
      texto: "Cerrajería confiable 24/7 🔐",
    },
  ];

  // =========================================
  // STATES
  // =========================================

  const [index, setIndex] = useState(0);

  // =========================================
  // FUNCIONES CARRUSEL
  // =========================================

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // =========================================
  // AUTO SLIDE
  // =========================================

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  // =========================================
  // SEGURIDAD
  // =========================================

  if (!slides[index]) return null;

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="home">
      {/* HERO */}
      <section
        className="hero-premium"
        style={{
          backgroundImage: `url(${slides[index].img})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Soluciones Profesionales
            <br />
            para tu Hogar y Negocio
          </h1>

          <p>
            Electricidad, remodelaciones,
            cerrajería y sistemas electrónicos
            de seguridad con atención rápida,
            moderna y garantizada.
          </p>

          {/* BOTONES */}
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/reserva")}
            >
              Reservar Ahora
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/mis-reservas")}
            >
              Ver Reservas
            </button>
          </div>

          {/* WHATSAPP PREMIUM */}
          <a
            href="https://wa.me/573003562584?text=Hola,%20quiero%20información%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-card"
          >
            <div className="whatsapp-left">
              <div className="whatsapp-icon">
                <i className="fab fa-whatsapp"></i>
              </div>

              <div className="whatsapp-text">
                <h3>¿Necesitas ayuda?</h3>
                <p>Escríbenos por WhatsApp</p>
              </div>
            </div>

            <div className="whatsapp-right">
              <span>Escribir ahora</span>
              <i className="fas fa-chevron-right"></i>
            </div>
          </a>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="stats">
        <div className="stat-card">
          <h2>+500</h2>
          <p>Clientes satisfechos</p>
        </div>

        <div className="stat-card">
          <h2>+1200</h2>
          <p>Servicios realizados</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Atención inmediata</p>
        </div>
      </section>

      {/* CARRUSEL */}
      <section className="carousel">
        <div className="carousel-header">
          <span className="carousel-subtitle">
            SERVICIOS DESTACADOS
          </span>

          <h2>
            Soluciones Profesionales
            para tu Hogar y Empresa
          </h2>

          <p>
            Tecnología, seguridad y calidad
            en cada uno de nuestros servicios.
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-overlay"></div>

          <button
            className="carousel-btn left"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            ←
          </button>

          <img
            src={slides[index].img}
            alt={slides[index].texto}
            className="carousel-img"
          />

          <div className="carousel-info">
            <span className="carousel-badge">
              Servicio Premium
            </span>

            <h3>{slides[index].texto}</h3>

            <button
              className="carousel-action-btn"
              onClick={() => navigate("/reserva")}
            >
              Reservar Servicio
            </button>
          </div>

          <button
            className="carousel-btn right"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>

        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <span
              key={i}
              className={
                index === i
                  ? "indicator active"
                  : "indicator"
              }
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services">
        <div className="services-header">
          <span className="services-subtitle">
            NUESTROS SERVICIOS
          </span>

          <h2>
            Expertos en Soluciones Integrales
          </h2>

          <p>
            Ofrecemos servicios modernos,
            rápidos y profesionales para
            hogares y empresas.
          </p>
        </div>

        <div className="services-grid">
          {/* ELECTRICIDAD */}
          <div
            className="card"
            onClick={() =>
              navigate("/servicio/electricidad")
            }
          >
            <div className="card-glow"></div>
            <span className="icon">⚡</span>
            <h3>Electricidad</h3>
            <p>
              Instalaciones, mantenimiento
              y reparación eléctrica profesional.
            </p>
            <button className="service-btn">
              Ver Servicio
            </button>
          </div>

          {/* PLOMERÍA */}
          <div
            className="card"
            onClick={() =>
              navigate("/servicio/plomeria")
            }
          >
            <div className="card-glow"></div>
            <span className="icon">🚿</span>
            <h3>Plomería</h3>
            <p>Soluciones rápidas para fugas.</p>
            <button className="service-btn">
              Ver Servicio
            </button>
          </div>

          {/* CERRAJERÍA */}
          <div
            className="card"
            onClick={() =>
              navigate("/servicio/cerrajeria")
            }
          >
            <div className="card-glow"></div>
            <span className="icon">🔐</span>
            <h3>Cerrajería</h3>
            <p>
              Apertura de puertas, cambio de cerraduras
              y seguridad 24/7.
            </p>
            <button className="service-btn">
              Ver Servicio
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonials">
        <h2>Lo que dicen nuestros clientes</h2>

        <div className="testimonials-grid">
          <div className="test-card">
            “Excelente servicio, muy rápido 👌”
          </div>

          <div className="test-card">
            “La remodelación quedó increíble 🏠”
          </div>

          <div className="test-card">
            “Muy confiables y profesionales 💯”
          </div>
        </div>
      </section>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href="https://wa.me/573003562584?text=Hola,%20quiero%20información%20sobre%20sus%20servicios"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default Home;