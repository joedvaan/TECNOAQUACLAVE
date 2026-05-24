import React from "react";
import {
  FaUsers,
  FaClipboardList,
  FaTools,
  FaChartLine,
} from "react-icons/fa";

import "../styles/admin.css";

function AdminPanel() {

  return (

    <div className="admin-container">

      {/* 🔥 SIDEBAR */}
      <aside className="sidebar">

        <h2 className="logo">
          VDJ ADMIN
        </h2>

        <ul>

          <li>
            Dashboard
          </li>

          <li>
            Reservas
          </li>

          <li>
            Usuarios
          </li>

          <li>
            Técnicos
          </li>

          <li>
            Configuración
          </li>

        </ul>

      </aside>

      {/* 🔥 CONTENIDO */}
      <main className="admin-main">

        <h1>
          Panel Administrador
        </h1>

        {/* 🔥 CARDS */}
        <div className="cards">

          <div className="card-admin">

            <FaClipboardList className="icon-admin" />

            <h2>
              125
            </h2>

            <p>
              Reservas
            </p>

          </div>

          <div className="card-admin">

            <FaUsers className="icon-admin" />

            <h2>
              58
            </h2>

            <p>
              Usuarios
            </p>

          </div>

          <div className="card-admin">

            <FaTools className="icon-admin" />

            <h2>
              12
            </h2>

            <p>
              Técnicos
            </p>

          </div>

          <div className="card-admin">

            <FaChartLine className="icon-admin" />

            <h2>
              95%
            </h2>

            <p>
              Satisfacción
            </p>

          </div>

        </div>

        {/* 🔥 TABLA */}
        <div className="table-container">

          <h2>
            Últimas Reservas
          </h2>

          <table>

            <thead>

              <tr>

                <th>
                  Cliente
                </th>

                <th>
                  Servicio
                </th>

                <th>
                  Fecha
                </th>

                <th>
                  Estado
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  Johan
                </td>

                <td>
                  Electricidad
                </td>

                <td>
                  20/05/2026
                </td>

                <td className="pendiente">
                  Pendiente
                </td>

              </tr>

              <tr>

                <td>
                  Sofía
                </td>

                <td>
                  Remodelaciones
                </td>

                <td>
                  22/05/2026
                </td>

                <td className="completado">
                  Completado
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}

export default AdminPanel;