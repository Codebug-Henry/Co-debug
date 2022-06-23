//import { useDispatch } from 'react-redux'
import { useState } from 'react'
import React from 'react'
import style from "./styles/CardQuestion.module.css"
import like from "../images/like2.png"
import dislike from "../images/dislike2.png"
import denuncia from "../images/denuncia2.png"
import favorito from "../images/favorito2.png"

const CardQuestion = ({cantAnswers, nickname, id, likes, title, text, teachPoints}) => {
    
    //const dispatch = useDispatch()
    const [ likeOnScreen, setlikeOnScreen ] = useState(likes)


    //handlers likes ( faltan las actions sumarLike y restarLike )
    const handlerLike = ()=>{
        // dispatch(sumarLike())
        // setlikeOnScreen(likes)
        return
    }

    const handlerDislike = ()=>{
        // dispatch(restarLike())
        // setlikeOnScreen(likes)
        return
    }

  return (
    <div className={style.total}>
        <div className={style.leftBox}>
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
                    <img onClick={()=> handlerLike()} src={like} alt="mano arriba" className={style.like}/>
                    <img onClick={()=> handlerDislike()} src={dislike} alt="mano abajo" className={style.dislike}/>
                </div>
                <div>
                    <img src={favorito} alt="favorito" className={style.like}/>
                </div>
                <div>
                    <img src={denuncia} alt="denuncia" className={style.like}/>
                </div>
            </div>
        </div>
        <div className={style.rightBox}>
            <button className={style.answerIt}>
                Responder
            </button>
        </div>
    </div>
  )
}

export default CardQuestion