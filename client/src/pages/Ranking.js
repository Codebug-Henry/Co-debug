import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Ranking.module.css";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading";

const Ranking = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid${style.container}`}>
            <div className={`row ${style.puestos}`}>
              <div>
                <p className={style.Titulo}>PUESTO 1</p>
                <p>Gonzalo</p>
                <p>Puntos: 10.000</p>
              </div>
            </div>
            <div className={`row ${style.puestos}`}>
              <div>
                <p className={style.Titulo}>PUESTO 2</p>
                <p>Pato</p>
                <p>Puntos: 9.000</p>
              </div>
            </div>
            <div className={`row ${style.puestos}`}>
              <div>
                <p className={style.Titulo}>PUESTO 3</p>
                <p>Mati</p>
                <p>Puntos: 8.000</p>
              </div>
            </div>
            <div className={`row ${style.puestos}`}>
              <div>
                <p className={style.Titulo}>PUESTO 4</p>
                <p>Lucho</p>
                <p>Puntos: 7.000</p>
              </div>
            </div>
            <div className={`row ${style.puestos}`}>
              <div>
                <p className={style.Titulo}>PUESTO 5</p>
                <p>Davo</p>
                <p>Puntos: 6.000</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Ranking;
