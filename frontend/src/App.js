import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reserva from "./pages/Reserva";
import MisReservas from "./pages/MisReservas";
import ServicioDetalle from "./pages/ServicioDetalle";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* 🔒 Protegidas */}
        <Route path="/reserva" element={
          <PrivateRoute>
            <Reserva />
          </PrivateRoute>
        } />

        <Route path="/mis-reservas" element={
          <PrivateRoute>
            <MisReservas />
          </PrivateRoute>
        } />

        <Route path="/servicio/:tipo" element={<ServicioDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;