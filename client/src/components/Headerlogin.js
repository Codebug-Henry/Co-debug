import { Link } from "react-router-dom";
import logo from "../images/logo_codebug.png";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Headerlogin.module.css";
import { sendUserInfo } from "../redux/actions";
import Header from "./Header";
import HeaderLoading from "./HeaderLoading";
// import "../index.css";
// import useLocalStorage from "use-local-storage";

const Headerlogin = () => {
  const { user } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [width, setWidth] = useState(window.innerWitdh);

  // const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  // };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(sendUserInfo(user));
    }
  }, [dispatch, user, isAuthenticated]);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const handleLogOut = () => {
    logout();
    localStorage.clear();
  };

  if (isLoading) {
    return (
      <div>
        <HeaderLoading />
      </div>
    );
  }

  return isAuthenticated ? (
    // <div className="app" data-theme={theme}>
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
        <div className={`col-lg-3 ${style.col1}`}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div className={`col-lg-2 ${style.colPrin}`}>
          <Link to="/" className={style.linksInt}>
            Principal
          </Link>
          {/* <h4>Texto prueba</h4> */}
        </div>
        <div className={`col-lg-2 ${style.colPreg}`}>
          <Link to="/preguntar" className={style.linksInt}>
            Preguntar
          </Link>
        </div>
        <div className={`col-lg-2 ${style.colRank}`}>
          <Link to="/ranking" className={style.linksInt}>
            Ranking
          </Link>
        </div>

        <div className={`col-lg-3 ${style.col4} ${style.imgNameLogOut}`}>
          <div className={style.padreDivs}>
            <Link
              to={`/configuracion/${userInfo.sub}`}
              className={style.contImagen}
            >
              <img
                className={style.userImage}
                src={
                  userInfo.picture
                  // ? userInfo.picture
                  // : "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
                }
                alt={userInfo.name}
                referrerPolicy="no-referrer"
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
                {userInfo.name}
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
                      Favoritas
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
                  {userInfo.statusAdmin ? (
                    <Link className={style.linkDesp} to="/codenothere">
                      <p className="dropdown-item" href="#">
                        Admin
                      </p>
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
                <li>
                  <Link
                    className={style.linkDesp}
                    to={`/configuracion/${userInfo.sub}`}
                  >
                    <p className="dropdown-item" href="#">
                      Configuración
                    </p>
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <p
                    onClick={handleLogOut}
                    className={`dropdown-item ${style.logOut}`}
                    href="#"
                  >
                    Log Out
                  </p>
                </li>
              </ul>
            </div>
            {/* <div className={`col-lg-1 ${style.colButton}`}>
              <button onClick={switchTheme} className="button">
                Dark
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    // </div>
    <Header />
  );
};

export default Headerlogin;
