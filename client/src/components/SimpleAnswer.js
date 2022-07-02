import React from 'react'
import style from "./styles/SimpleAnswer.module.css"
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';

const SimpleAnswer = ({text, likes, name}) => {

  return (
    <div className={style.total}>
        <div className={style.info}>
            <div className={style.user}>
                Usuario: {name}
            </div>
            <div className={style.likes}>
                Likes: {likes}
            </div>
        </div>
        <div className={style.answerText}>
                {/* Respuesta: {text} */}
                <p>Respuesta:</p>
                <ReactMarkdown
                  children={text}
                  className={style.markdown}
                  components={{ code: Highlighter }}
                />
        </div>
    </div>
  )
}

export default SimpleAnswer