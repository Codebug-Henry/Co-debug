import React from "react";
import style from "./styles/Ayuda.module.css";
import Footer from "../components/Footer.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getNotifications } from "../redux/actions";

const Ayuda = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications(user.sub));
    }
  }, [dispatch, user, isAuthenticated]);

  return (
    <div className={style.containerTotal}>
      <div className={`container-fluid ${style.container}`}>
        <p className={style.title}>Preguntas frecuentes</p>
        <div className={`row ${style.row1}`}>
          <div className={`col-lg ${style.col1}`}>
            <div className={style.questionContainer}>
              <div>¿Cuál es el propósito de esta página?</div>
            </div>
            <div className={style.answerContainer}>
              Este sitio tiene como propósito incentivar la colaboración
              colectiva entre estudiantes iniciantes de programación. El mismo
              cuenta con las herramientas necesarias para facilitar la
              comunicación entre usuarios mediante preguntas y respuestas.
            </div>
          </div>
          <div className={`col-lg ${style.col2}`}>
            <div className={style.questionContainer}>
              <div>¿Mis datos están seguros?</div>
            </div>
            <div className={style.answerContainer}>
              Tus datos se encuentran en buenas manos. La arquitectura de
              nuestro sitio está pensada para no exponer información sensible.
              Ten en cuenta que las informaciones que facilites mediante tus
              preguntas, respuestas y/o anexos, como tu número de contacto, son
              enteramente tu responsabilidad.
            </div>
          </div>
        </div>
        <div className={`row ${style.row2}`}>
          <div className={`col-lg ${style.col1}`}>
            <div className={style.questionContainer}>
              <div>Si me doy de baja, ¿mis datos se pierden?</div>
            </div>
            <div className={style.answerContainer}>
              Efectivamente. Cuando te das de baja nosotros, detras de cortinas,
              nos encargamos de limpiar los residuos. Tus preguntas, respuestas
              y hasta tu super foto de perfil se perderán para siempre en el
              olvido.
            </div>
          </div>

          <div className={`col-lg ${style.col2}`}>
            <div className={style.questionContainer}>
              <div>¿Para qué sirven los Teachpoints?</div>
            </div>
            <div className={style.answerContainer}>
              Los "Teachpoints" son nuestra humilde manera de reconocer el
              esfuerzo ajeno y la empatía. Los usuarios con mayor participación
              se encontrarán visibles en los primeros puestos de nuestra
              sección: Ranking. ¿Preparado/a para la fama?
            </div>
          </div>
        </div>
        <div className={`row ${style.row3}`}>
          <div className={`col-lg ${style.col1}`}>
            <div className={style.questionContainer}>
              <div>¿Cuánto tarda en ser respondida mi pregunta?</div>
            </div>
            <div className={style.answerContainer}>
              Tristemente eso ya no depende de nosotros. Otros usuarios de gran
              corazón velarán por tu salud emocional al intentar responder tu
              pregunta incluso antes que otras recién llegadas. Esto se debe a
              su gran humanidad y tal vez también porque ganan puntos extras por
              responder las preguntas más longevas en nuestro sistema.
            </div>
          </div>
          <div className={`col-lg ${style.col2}`}>
            <div className={style.questionContainer}>
              <div>¿Qué hago ante un comportamiento inadecuado?</div>
            </div>
            <div className={style.answerContainer}>
              Denunciá cualquier comportamiento que consideres impropio,
              irrespetuoso o de mal gusto con cualquiera de los administradores.
              Encontrarás un botón "denunciar" disponible en preguntas y
              respuestas por toda nuestra página. Igual, ante todo, te pedimos
              paciencia. Somos muy geniales pero todavía no somos pulpos!
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

export default Ayuda;
