import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/Footer.module.css";

const footer = () => {
  return (
    <div class={`container-fluid ${style.container}`}>
      <div class={`row ${style.middleRow}`}>
        <div class={`col-lg-4 ${style.col1}`}>
          <Link class={style.links} to="/ayuda">
            Ayuda
          </Link>
        </div>
        <div class={`col-lg-4 ${style.col2}`}>
          <Link class={style.links} to="/creadores">
            Creadores
          </Link>
        </div>
        <div class={`col-lg-4 ${style.col3}`}>
          Todos los derechos re sebados y los torcidos ni te cuento
        </div>
      </div>
    </div>
  );
};

export default footer;
