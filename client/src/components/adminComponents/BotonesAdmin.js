import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/BotonesAdmin.module.css";

export default function BotonesAdmin() {
  return (
    <div>
      <div className={`container-fluid ${style.container}`}>
        <div className={`row ${style.row}`}>
          <div className={`col-lg ${style.col}`}>
            <div className="d-grid gap-2 mx-auto">
              <Link className={style.link} to="/codenothere/alertas">
                <button
                  className={`btn btn-warning ${style.buttonAlertas}`}
                  data-toggle="button"
                  type="button"
                >
                  Alertas
                </button>
              </Link>
              <Link className={style.link} to="/codenothere/usuarios">
                <button
                  className={`btn btn-warning ${style.buttonUsuarios}`}
                  data-toggle="button"
                  type="button"
                >
                  Lista usuarios
                </button>
              </Link>
              <Link className={style.link} to="/codenothere/admins">
                <button
                  className={`btn btn-warning ${style.buttonAdmin}`}
                  data-toggle="button"
                  type="button"
                >
                  Agregar Admin
                </button>
              </Link>
              <Link className={style.link} to="/codenothere/mensajes">
                <button
                  className={`btn btn-warning ${style.buttonPreguntas}`}
                  data-toggle="button"
                  type="button"
                >
                  Preguntas directas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
