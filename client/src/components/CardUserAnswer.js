import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
                <h2>{e.text}</h2>
                <p>{e.teachPoints}</p>
            </div>
        </div>
    ))}
    </>
  )
}

export default CardUserAnswer