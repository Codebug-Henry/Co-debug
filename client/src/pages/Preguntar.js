import React from 'react';
import style from "./styles/Preguntar.module.css";
import Footer from "../components/Footer.js";
import FormQuestion from '../components/FormQuestion';
import Loading from '../components/Loading';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { getNotifications } from "../redux/actions";

const Preguntar = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
          dispatch(getNotifications(user.sub))
        }
    }, [dispatch, user, isAuthenticated]);

    if (isLoading) {
        return (
          <div>
            <Loading />
          </div>
        );
      }

    return (
        <div className={style.fullContainer}>
        {
        isAuthenticated ? (
        <div className={style.middleRow}>
            <div className={`container-fluid ${style.container}`}>
                <div className={`row ${style.middleRow}`}>
                    <div className={`col-lg ${style.col1}`}>
                        <FormQuestion />
                    </div>
                </div>
            </div>
        </div>
        ):
        <div className={style.total}>
            {/* Acá el contenido para no logueados */}
            <h1>Para poder hacer preguntas primero hay que loguearse</h1>
        </div>
        }
            <div className={style.footer}><Footer/></div>
        </div>
    )
}

export default Preguntar