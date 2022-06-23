import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux" 
import {getAllQuestions} from "../redux/actions/index.js"
import CardQuestion from "./CardQuestion.js"
import style from "./styles/CardsQuestions.module.css"

const CardsQuestions = () => {

    const dispatch = useDispatch()
    const questions = useSelector((state)=> state.questions)
    useEffect(()=>{
        dispatch(getAllQuestions())
    },[dispatch])


  return (
    <div className={style.questBox}>
        <div className={style.boxQuestions}>
        {questions && questions.map((e)=>
            <CardQuestion 
            cantAnswers={e.cantAnswers}
            nickname={e.user.nickname}
            key={e.id}
            id={e.id}
            likes={e.likes}
            title={e.title} 
            text={e.text} 
            teachPoints={e.teachPoints}/>
            )
        }
        </div>
        <div className={style.paginado}>
            <h3> acá el paginado </h3>
        </div>
    </div>
  )
}

export default CardsQuestions