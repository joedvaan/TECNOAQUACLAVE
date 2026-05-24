import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/reset.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Contraseña actualizada");
      navigate("/login");

    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nueva contraseña</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       <button className="btn-reset">
        Cambiar contraseña
       </button>
      </form>
    </div>
  );
}

export default ResetPassword;