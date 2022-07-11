import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/BotonesAdmin.module.css"

export default function BotonesAdmin(){

    return(
        <div>
            <div className={`container-fluid ${style.container}`}>
              <div className={`row ${style.row1}`}>
                <div className={`col-lg ${style.colRow1}`}>
                  <div className="d-grid gap-2 mx-auto">
                    <Link to="/codenothere/alertas">
                        <button
                        className="btn btn-warning"
                        data-toggle="button"
                        type="button">
                            Alertas
                        </button>
                    </Link>
                    <Link to="/codenothere/usuarios">
                        <button
                        className="btn btn-warning"
                        data-toggle="button"
                        type="button">
                        Lista usuarios
                        </button>
                    </Link>
                    <Link to="/codenothere/admins">
                        <button
                        className="btn btn-warning"
                        data-toggle="button"
                        type="button">
                        Agregar Admin
                        </button>
                    </Link>
                    <Link to="/codenothere/mensajes">
                        <button
                        className="btn btn-warning"
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
    )
}