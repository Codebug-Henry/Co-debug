import { Link } from "react-router-dom";
import logo from "../images/logo_codebug.png";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Headerlogin.module.css";
import Butlogout from "./Butlogout";

const Headerlogin = () => {
  const { user } = useAuth0();

  const [width, setWidth] = useState(window.innerWitdh);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div class={`container-fluid ${style.container}`}>
      <div class={`row ${style.row1}`}>
        <div class={`col-lg ${style.col1}`}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div class={`col-lg ${style.col2}`}>
          <Link to="/" className={style.linksInt}>
            PRINCIPAL
          </Link>
          <Link to="/ranking" className={style.linksInt}>
            RANKING
          </Link>
        </div>

        <div class={`col-lg ${style.col3}`}>
          <div className={style.linksInt}>RANKEADO</div>
          <div className={style.linksInt}>TEACH POINTS</div>
        </div>

        <div class={`col-lg ${style.col4} ${style.imgNameLogOut}`}>
          <Link to="/configuracion" className={style.contImagen}>
            <img
              className={style.userImage}
              src={user.picture}
              alt={user.name}
            />
          </Link>
          <div class="dropdown">
            <button
              class={`
                ${
                  width > 600
                    ? "btn btn-secondary dropdown-toggle"
                    : "btn btn-secondary btn-sm"
                }
              `}
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Nombre traer
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link className={style.linkDesp} to="/mispreguntas">
                  <p class="dropdown-item" href="#">
                    Mis preguntas
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/misrespuestas">
                  <p class="dropdown-item" href="#">
                    Mis respuestas
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/favoritas">
                  <p class="dropdown-item" href="#">
                    Favoritos
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/preguntar">
                  <p class="dropdown-item" href="#">
                    Preguntar
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/admin">
                  <p class="dropdown-item" href="#">
                    Admin
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/configuracion">
                  <p class="dropdown-item" href="#">
                    Configuración
                  </p>
                </Link>
              </li>

              <li>
                <hr class="dropdown-divider"></hr>
              </li>
              <li>
                <p class="dropdown-item" href="#">
                  <Butlogout />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headerlogin;
