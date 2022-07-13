import { Link } from "react-router-dom";
import logo_gif from "../images/logo_codebug2.gif";
import logo from "../images/logo_codebug _margen.png";
import React, {useState} from "react";
import style from "./styles/Header.module.css";
import Butlog from "./Butlog";

const HeaderLogout = () => {

  const [logoState, setLogoState] = useState(logo);

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg-3 ${style.col1}`}>
          <Link to="/">
              <img
                onMouseLeave={() => setLogoState(logo)}
                onMouseOver={() => setLogoState(logo_gif)}
                className={style.logo}
                src={logoState}
                alt="logo"
              />
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
