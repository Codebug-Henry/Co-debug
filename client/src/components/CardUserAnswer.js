import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from "./styles/CardUserAnswer.module.css";
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';

const CardUserAnswer = () => {
  const answers = useSelector(state => state.answers)
  const user = useSelector(state => state.user)

  return (
    <>
    {answers?.map(e => (
        <div key={e.id}>
            <div key={e.question.id}>
                <h4>{e.question.title}</h4>
                <p>{e.question.text}</p>
                <p>Cant. respuestas: {e.question.cantAnswers}</p>
                <Link to={`/responder/${e.question.id}`}>
                <button>Ir a la pregunta</button>
                </ Link>
            </div>
            <div>
                <img src={user.picture} alt='Mi foto'/>
                {/* <h2>{e.text}</h2> */}
                <ReactMarkdown
                  children={e.text}
                  className={style.markdown}
                  components={{ code: Highlighter }}
                />
                <p>{e.teachPoints}</p>
            </div>
        </div>
    ))}
    </>
  )
}

export default CardUserAnswer