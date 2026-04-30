import React, { useEffect } from "react"; // 👉 React + useEffect para efectos
import { useParams, useNavigate } from "react-router-dom"; 
// 👉 useParams = leer parámetros de la URL (/servicio/:tipo)
// 👉 useNavigate = redirigir a otra página

function ServicioDetalle() {
  const { tipo } = useParams(); 
  // 👉 Obtiene el tipo de servicio desde la URL (ej: electricidad)

  const navigate = useNavigate(); 
  // 👉 Función para redirigir

  // 🔥 animación al hacer scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    // 👉 Selecciona todos los elementos con clase "fade-in"

    const observer = new IntersectionObserver((entries) => {
      // 👉 Detecta cuando un elemento aparece en pantalla
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1; 
          // 👉 Hace visible el elemento

          entry.target.style.transform = "translateY(0)";
          // 👉 Lo mueve a su posición original (animación)
        }
      });
    });

    elements.forEach((el) => observer.observe(el));
    // 👉 Aplica la animación a cada elemento
  }, []);

  const servicios = {
    electricidad: {
      titulo: "Servicios de Electricidad ⚡",
      imagen: "/img/electricidad.jpg",
      color: "#0072ff",
    },
    plomeria: {
      titulo: "Servicios de Plomería 🚰",
      imagen: "/img/plomeria.jpg",
      color: "#00b894",
    },
    cerrajeria: {
      titulo: "Servicios de Cerrajería 🔐",
      imagen: "/img/cerrajeria.jpg",
      color: "#6c5ce7",
    },
  };
  // 👉 Objeto con la información de cada servicio

  const servicio = servicios[tipo];
  // 👉 Selecciona el servicio según la URL

  if (!servicio) {
    return <h2 style={{ textAlign: "center" }}>Servicio no encontrado</h2>;
    // 👉 Si no existe el tipo → muestra error
  }

  return (
    <div>

      {/* 🔥 HERO CON IMAGEN */}
      <section
        style={{
          height: "70vh", // 👉 Altura del banner
          backgroundImage: `url(${servicio.imagen})`, 
          // 👉 Imagen dinámica según servicio
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
      >
        <h1 style={{ fontSize: "50px" }}>
          {servicio.titulo}
          {/* 👉 Título dinámico */}
        </h1>
      </section>

      {/* 🎯 SERVICIOS */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 className="fade-in">¿Qué hacemos?</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            // 👉 Grid adaptable
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {[
            "Instalaciones profesionales",
            "Reparaciones rápidas",
            "Mantenimiento preventivo",
            "Atención 24/7",
          ].map((item, i) => (
            <div
              key={i}
              className="fade-in"
              style={{
                padding: "20px",
                borderRadius: "15px",
                background: "#f5f5f5",
              }}
            >
              {item}
              {/* 👉 Cada servicio mostrado */}
            </div>
          ))}
        </div>
      </section>

      {/* 📊 STATS */}
      <section
        style={{
          background: servicio.color, 
          // 👉 Color dinámico según servicio
          color: "white",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2>Confianza que nos respalda</h2>
        <p>⭐ +500 clientes satisfechos</p>
        <p>⚡ +1000 servicios realizados</p>
        <p>🏆 5 años de experiencia</p>
      </section>

      {/* 💬 TESTIMONIOS */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Lo que dicen nuestros clientes</h2>

        <div style={{ maxWidth: "600px", margin: "auto" }}>
          <p>"Excelente servicio, muy rápidos y profesionales 👌"</p>
          <p>"Solucionaron mi problema en minutos ⚡"</p>
          <p>"Totalmente recomendados 💯"</p>
        </div>
      </section>

      {/* 🚀 CTA FINAL */}
      <section style={{ textAlign: "center", padding: "60px" }}>
        <h2>¿Listo para contratar?</h2>

        <button
          onClick={() => navigate("/reserva")}
          // 👉 Redirige a la página de reservas
          style={{
            padding: "15px 40px",
            borderRadius: "30px",
            border: "none",
            background: servicio.color,
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          🚀 Reservar ahora
        </button>
      </section>

      {/* 📱 WHATSAPP FLOAT */}
      <a
        href="https://wa.me/573000000000"
        target="_blank"
        rel="noreferrer"
        // 👉 Abre WhatsApp en otra pestaña
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#25D366",
          color: "white",
          padding: "15px",
          borderRadius: "50%",
          fontSize: "24px",
          textDecoration: "none",
        }}
      >
        💬
      </a>

    </div>
  );
}

export default ServicioDetalle; // 👉 Exporta el componente