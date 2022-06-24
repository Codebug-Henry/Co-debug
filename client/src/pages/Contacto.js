import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Contacto.module.css";
import Footer from "../components/Footer.js";
// import FormQuestion from '../components/FormQuestion';

const Contacto = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.col1}`}>
                <div className={style.title}>Contacto</div>
                <div className={style.email}>email: codebughenry@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.middleRow}`}>
            <div className={`col-lg ${style.col1}`}>
              <div className={style.title}>Contacto</div>
              <div className={style.email}>email: codebughenry@gmail.com</div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Contacto;
