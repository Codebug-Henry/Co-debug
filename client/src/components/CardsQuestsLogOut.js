import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux" 
import {getAllQuestions, getSearchQuestions} from "../redux/actions/index.js"
import CardQuestLogOut from "./CardQuestLogOut.js"
import style from "./styles/CardsQuestions.module.css"

const CardsQuestsLogOut = () => {

    const dispatch = useDispatch()
    const questions = useSelector((state)=> state.questions)
    const pages = useSelector(state => state.pages)
    const [page, setPage] = useState(1)    
    const [input, setInput] = useState("");

    useEffect(()=>{
        dispatch(getAllQuestions(page))
    },[dispatch, page])

    const onChangeSearch = (e)=>{
        setInput(e.target.value);
        dispatch(getSearchQuestions(e.target.value, page));
    }

    const handleRestart = (e)=>{
        e.preventDefault();
        setInput("");
        dispatch(getAllQuestions(page));
    }

    const handleClick = (e) => {
        e.preventDefault()
        setPage(parseInt(e.target.value))
    }

    
  console.log(questions)

  return (
    <div divclassName={style.questBox}>

            <div className={style.searchBar}>
                <input type="text" onChange={(e)=>onChangeSearch(e)} placeholder="Buscar..."></input>
                <button onClick={(e)=>handleRestart(e)} value={input}>Reiniciar</button>
            </div>

            <div className={style.boxQuestions}>
            {questions && questions.map((e)=>
                <CardQuestLogOut 
                cantAnswers={e.cantAnswers}
                nickname={e.user ? e.user.nickname : 'anonimo'}
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
                    {pages && pages.map(pag =>
                        (   
                                <button key={pag} onClick={e => handleClick(e)} value={pag}>{pag}</button>      
                        )
                    )}            
            </div>
        
    </div>
  )
}

export default CardsQuestsLogOut