import { Link } from "react-router-dom";
import logo from "../images/logo_codebug.png";
import React from "react";
import style from "./styles/Header.module.css";
import Butlog from "./Butlog";
import { useAuth0 } from "@auth0/auth0-react";

const HeaderLogout = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg-3 ${style.col1}`}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div className={`col-lg-6 ${style.colPreg}`}>
          <Link to='/preguntar'>          
          <button className={style.linksInt}>
            Preguntar
          </button>
          </Link>
        </div>
        <div className={`col-lg-3 ${style.col4}`}>
          <div className={style.botonLogIn}>
            <Butlog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogout;
