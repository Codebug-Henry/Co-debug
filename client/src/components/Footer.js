import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/Footer.module.css";

const footer = () => {
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.middleRow}`}>
        <div className={`col-lg-4 ${style.col1}`}>
          <Link className={style.links} to="/ayuda">
            Ayuda
          </Link>
        </div>
        <div className={`col-lg-4 ${style.col2}`}>
          <Link className={style.links} to="/creadores">
            Creadores
          </Link>
        </div>
        <div className={`col-lg-4 ${style.col3}`}>
          <Link className={style.links} to="/terminos">
            Terminos y condiciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default footer;
