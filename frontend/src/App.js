import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Login from "./pages/Login";     // ✅ carpeta "pages"
import Register from "./pages/Register";
import Reserva from "./pages/Reserva";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/reserva" element={<Reserva />} />
      </Routes>
    </Router>
  );
}

export default App;