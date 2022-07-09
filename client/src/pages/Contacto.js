import React from "react";
import style from "./styles/Contacto.module.css";
import Footer from "../components/Footer.js";
import FormContact from "../components/FormContact.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { getNotifications } from "../redux/actions";

const Contacto = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
      if (isAuthenticated) {
        dispatch(getNotifications(user.sub))
      }
  }, [dispatch, user, isAuthenticated]);

  return (
    <div className={style.fullContainer}>
      <div>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.middleRow}`}>
            <div className={`col-lg ${style.col1}`}>
              <FormContact />

              <div className={style.email}>email: codebughenry@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Contacto;
