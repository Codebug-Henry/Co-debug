import React from 'react'
import style from "./styles/SimpleAnswer.module.css"


const SimpleAnswer = ({text,likes,userSub}) => {

  return (
    <div className={style.total}>
        <div className={style.info}>
            <div className={style.user}>
                Usuario: {userSub}
            </div>
            <div className={style.likes}>
                Likes: {likes}
            </div>
        </div>
        <div className={style.answerText}>
                Respuesta: {text}
        </div>
    </div>
  )
}

export default SimpleAnswer