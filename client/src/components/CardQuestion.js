import { Link } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import style from "./styles/CardQuestion.module.css"
import like from "../images/like2.png"
import dislike from "../images/dislike2.png"
import denuncia from "../images/denuncia2.png"
import favorito from "../images/favorito2.png"



const CardQuestion = ({cantAnswers, nickname, picture, likes, title, text, teachPoints,id}) => {

   const [ likeOnScreen, setlikeOnScreen ] = useState(likes)

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row gy-300 ${style.fila}`}>
        <div className={`col-2-lg ${style.pictureBox}`}>
          <img
            className={style.userImage}
            src={picture}
            alt="imagen de usuario"
          />
        </div>
        <div className={`col-8-lg ${style.leftBox}`}>
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
            <div className={style.questionText}>
              {text}
            </div>
          <div className={style.bajoTexto}>
            <div className={style.likes}>
              {likeOnScreen}
              <img src={like} alt="mano arriba" className={style.like}/>
              <img src={dislike} alt="mano abajo" className={style.dislike}/>
            </div>

            <div>
              <img src={favorito} alt="favorito" className={style.like}/>
            </div>
            <div>
              <img src={denuncia} alt="denuncia" className={style.like} />
            </div>
          </div>
        </div>
      </div>
      <div className={`col-2-lg ${style.rightBox}`}>
        <Link to={`/responder/${id}` }>
          <button  className={style.answerIt}>
              Responder
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardQuestion;
