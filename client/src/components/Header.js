import { Link } from "react-router-dom";
import logo from "../images/logo_codebug.png";
import React from "react";
import style from "./styles/Header.module.css";
import Butlog from "./Butlog";

const headerlogout = () => {
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg ${style.col1}`}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>
        <div className={`col-lg ${style.col2}`}>
          <Butlog />
        </div>
      </div>
    </div>
  );
};

export default headerlogout;
