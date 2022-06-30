
import logo from "../images/logo_codebug.png";
import React from "react";
import style from "./styles/HeaderLoading.module.css";


const HeaderLoading = () => {
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg ${style.col1}`}>

            <img className={style.logo} src={logo} alt="logo" />

        </div>

        <div className={`col-lg ${style.col2}`}>
            {/* Acá va el loading png */}
            Cargando...
        </div>

        <div className={`col-lg ${style.col3}`}>

        </div>
      </div>
    </div>
  );
};

export default HeaderLoading;
