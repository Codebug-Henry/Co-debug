import {Link} from "react-router-dom";
import logo from "../images/logo_codebug.png";
import React from "react";
import style from "./styles/Header.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const HeaderBanned = () => {
  const { logout } = useAuth0();

  const handleLogOut = (e) => {
    e.preventDefault()
    logout({ returnTo: window.location.origin });
    localStorage.clear();
  };

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg-3 ${style.col1}`}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div className={`col-lg-6 ${style.colPreg}`}>
        
        </div>
        <div className={`col-lg-3 ${style.col4}`}>
          <div className={style.botonLogIn}>
            <button type="button" className="btn btn-warning" onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanned;
