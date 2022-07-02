
import logo from "../images/logo_codebug.png";
import React from "react";
import style from "./styles/HeaderLoading.module.css";


const HeaderLoading = () => {
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg-3 ${style.col1}`}>
            <img className={style.logo} src={logo} alt="logo" />
        </div>
        <div className={`col-lg-2 ${style.colPrin}`}></div>
          <span to="/ranking" className={style.linksInt}>
            Cargando...
          </span>
        <div className={`col-lg-2 ${style.colPreg}`}></div>
        <div className={`col-lg-2 ${style.colRank}`}></div>
        <div className={`col-lg-3 ${style.col4} ${style.imgNameLogOut}`}></div>

      </div>
    </div>
  );
};

export default HeaderLoading;
