import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux" 
import {getAllQuestions, getSearchQuestions} from "../redux/actions/index.js"
import CardQuestion from "./CardQuestion.js"
import style from "./styles/CardsQuestions.module.css"

const CardsQuestions = () => {

    const dispatch = useDispatch()
    const questions = useSelector((state)=> state.questions)
    
    const [input, setInput] = useState("");

    useEffect(()=>{
        dispatch(getAllQuestions())
    },[dispatch])

    const onChangeSearch = (e)=>{
        setInput(e.target.value);
        dispatch(getSearchQuestions(e.target.value));
    }

    const handleRestart = (e)=>{
        e.preventDefault();
        setInput("");
        dispatch(getAllQuestions());
    }

  return (
    <div divclassName={style.questBox}>

            <div className={style.searchBar}>
                <input type="text" onChange={(e)=>onChangeSearch(e)} placeholder="Buscar..."></input>
                <button onClick={(e)=>handleRestart(e)} value={input}>Reiniciar</button>
            </div>

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
                teachPoints={e.teachPoints}
                picture={e.user.picture}/>
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