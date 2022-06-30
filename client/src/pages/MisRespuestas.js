import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAnswers } from '../redux/actions'
import style from "./styles/MisRespuestas.module.css";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading";
import CardUserAnswer from "../components/CardUserAnswer";

const MisRespuestas = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAnswers(user.sub, 1))
  }, [dispatch, user.sub])

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  
  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <CardUserAnswer />
            </div>
          </div>
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.colOut}`}>
                Logueate para ver tus respuestas
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MisRespuestas;
