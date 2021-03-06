import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./styles/BotonesAdmin.module.css";
import { toggleDarkmode } from "../../redux/actions";
// import { useState } from "react";

export default function BotonesAdmin({alertasOn, usuariosOn, adminOn, preguntasOn}) {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.dark);
  // const [selected, setSelected] = useState("");

  const toggleDark = () => {
    dispatch(toggleDarkmode());
  };

  const darkmode = {
    backgroundColor: dark ? "rgb(18, 18, 18)" : null,
  };

  // const buttonStyles = {
  //   backgroundColor: dark ? "rgb(22, 43, 120)" : null,
  //   color: dark ? "white" : "black",
  //   border: dark ? "none" : null,
  // };

  const darkButtonStyle = {
    backgroundColor: dark ? "rgb(209, 219, 255)" : null,
    border: dark ? "none" : null,
    color: dark ? "black" : null,
  };

  const buttonStylesAlert = {
    backgroundColor: alertasOn ? "#ff8800" : dark ? "rgb(22, 43, 120)" : null,
    color: dark ? "white" : "black",
    border: dark ? "none" : null,
  };

  const buttonStylesUsuarios = {
    backgroundColor: usuariosOn ? "#ff8800" : dark ? "rgb(22, 43, 120)" : null,
    color: dark ? "white" : "black",
    border: dark ? "none" : null,
  };

  const buttonStylesAdmin = {
    backgroundColor: adminOn ? "#ff8800" : dark ? "rgb(22, 43, 120)" : null,
    color: dark ? "white" : "black",
    border: dark ? "none" : null,
  };

  const buttonStylesPreguntas = {
    backgroundColor: preguntasOn ? "#ff8800" : dark ? "rgb(22, 43, 120)" : null,
    color: dark ? "white" : "black",
    border: dark ? "none" : null,
  };

  return (
    <div>
      <div className={`container-fluid ${style.container}`} style={darkmode}>
        <div className={`row ${style.row}`}>
          <div className={`col-lg ${style.col}`}>
            <div className="d-grid gap-2 mx-auto">
              <button
                onClick={toggleDark}
                className={`btn btn-dark ${style.buttonAlertas}`}
                style={darkButtonStyle}
              >
                {dark ? "Modo nocturno OFF" : "Modo nocturno ON"}
              </button>
              <Link className={style.link} to="/codenothere/alertas">
                <button
                  // onClick={(e) => setSelected(e.target.value)}
                  className={`btn btn-warning ${style.buttonAlertas}`}
                  data-toggle="button"
                  type="button"
                  style={buttonStylesAlert}
                  value="alertas"
                >
                  Alertas
                </button>
              </Link>
              <Link className={style.link} to="/codenothere/usuarios">
                <button
                  className={`btn btn-warning ${style.buttonUsuarios}`}
                  data-toggle="button"
                  type="button"
                  style={buttonStylesUsuarios}
                >
                  Lista usuarios
                </button>
              </Link>
              <Link className={style.link} to="/codenothere/admins">
                <button
                  className={`btn btn-warning ${style.buttonAdmin}`}
                  data-toggle="button"
                  type="button"
                  style={buttonStylesAdmin}
                >
                  Agregar Admin
                </button>
              </Link>
              <Link className={style.link} to="/codenothere/mensajes">
                <button
                  className={`btn btn-warning ${style.buttonPreguntas}`}
                  data-toggle="button"
                  type="button"
                  style={buttonStylesPreguntas}
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
