//import { useDispatch } from 'react-redux'
import { useState } from "react";
import React from "react";
import style from "./styles/CardQuestion.module.css";
import like from "../images/like2.png";
import dislike from "../images/dislike2.png";
import denuncia from "../images/denuncia2.png";
import favorito from "../images/favorito2.png";
import { useAuth0 } from "@auth0/auth0-react";

const CardQuestLogOut = ({
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
}) => {
  const { loginWithRedirect } = useAuth0();

  //const dispatch = useDispatch()

  const [likeOnScreen] = useState(likes);

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-2 ${style.pictureBox}`}>
          <img
            className={style.userImage}
            src={picture}
            alt="imagen de usuario"
          />
        </div>
        <div className={`col-lg-8 ${style.leftBox}`}>
          <div className={style.TitleAndExtrasBox}>
            <div className={style.userPreg}>
              <h6>{nickname} pregunta:</h6>
            </div>
            <div className={style.Title}>
              <h6>{title}</h6>
            </div>
            <div className={style.Extras}>
              <h6>
                Respuestas:{cantAnswers} - T.Points:{teachPoints}
              </h6>
            </div>
          </div>
          <div className={style.questionText}>{text}</div>
          <div className={style.bajoTexto}>
            <div className={style.likes}>
              {likeOnScreen}
              <img
                onClick={() => loginWithRedirect()}
                src={like}
                alt="mano arriba"
                className={style.like}
              />
              <img
                onClick={() => loginWithRedirect()}
                src={dislike}
                alt="mano abajo"
                className={style.dislike}
              />
            </div>

            <div>
              <img
                onClick={() => loginWithRedirect()}
                src={favorito}
                alt="favorito"
                className={style.like}
              />
            </div>
            <div>
              <img
                onClick={() => loginWithRedirect()}
                src={denuncia}
                alt="denuncia"
                className={style.like}
              />
            </div>
          </div>
        </div>
        <div className={`col-lg-2 ${style.rightBox}`}>
          <button
            onClick={() => loginWithRedirect()}
            className={style.answerIt}
          >
            Logueate para responder :D
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardQuestLogOut;
