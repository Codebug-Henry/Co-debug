import { Link } from "react-router-dom";
import logo from "../images/logo_codebug.png";
import React from "react";
import { useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Headerlogin.module.css";
import { sendUserInfo } from "../redux/actions";
import Header from './Header'

const Headerlogin = () => {
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  const [width, setWidth] = useState(window.innerWitdh);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if(user){
      dispatch(sendUserInfo(user))
    }
  }, [user])

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    isAuthenticated ? (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg ${style.col1}`}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div className={`col-lg ${style.col2}`}>
          <Link to="/" className={style.linksInt}>
            Principal
          </Link>
          <Link to="/preguntar" className={style.linksInt}>
            Preguntar
          </Link>
        </div>

        <div className={`col-lg ${style.col3}`}>
          <Link to="/ranking" className={style.linksInt}>
            Ranking
          </Link>
          <div className={style.linksInt}>Teach points {userInfo.myTeachPoints}</div>
        </div>

        <div className={`col-lg ${style.col4} ${style.imgNameLogOut}`}>
          <Link to="/configuracion" className={style.contImagen}>
            <img
              className={style.userImage}
              src={userInfo.picture}
              alt={userInfo.name}
            />
          </Link>
          <div className="dropdown">
            <button
              className={`
                ${
                  width > 600
                    ? "btn btn-warning btn-secondary dropdown-toggle"
                    : "btn btn-warning btn-secondary btn-sm"
                }
              `}
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.name}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link className={style.linkDesp} to="/mispreguntas">
                  <p className="dropdown-item" href="#">
                    Mis preguntas
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/misrespuestas">
                  <p className="dropdown-item" href="#">
                    Mis respuestas
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/favoritas">
                  <p className="dropdown-item" href="#">
                    Favoritos
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/preguntar">
                  <p className="dropdown-item" href="#">
                    Preguntar
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/admin">
                  <p className="dropdown-item" href="#">
                    Admin
                  </p>
                </Link>
              </li>
              <li>
                <Link className={style.linkDesp} to="/configuracion">
                  <p className="dropdown-item" href="#">
                    Configuración
                  </p>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <p onClick={() => logout()} className="dropdown-item" href="#">
                  Log Out
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>) : 
    <Header />
  );
};

export default Headerlogin;
