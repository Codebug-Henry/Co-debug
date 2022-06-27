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

    // const handleRestart = (e)=>{
    //     e.preventDefault();
    //     setInput("");
    //     dispatch(getAllQuestions(page));
    // }

    const handleClick = (e) => {
        e.preventDefault()
        setPage(parseInt(e.target.value))
    }

    const handlerRefresh = ()=>{
        window.location.reload(false);
      }
    
  console.log(questions)

  return (
    <div divclassName={style.questBox}>
        <div className={`container-fluid ${style.optionSearch}`}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Antiguedad
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Más antiguas</a></li>
                    <li><a class="dropdown-item" href="#">Más nuevas</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tag's General
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">js</a></li>
                    <li><a class="dropdown-item" href="#">python</a></li>
                    <li><a class="dropdown-item" href="#">react</a></li>
                    <li><a class="dropdown-item" href="#">redux</a></li>
                    <li><a class="dropdown-item" href="#">github</a></li>
                    <li><a class="dropdown-item" href="#">html</a></li>
                    <li><a class="dropdown-item" href="#">css</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">tag</a>
                </li>  
                </ul>
                <form class="d-flex">
                <input onChange={(e) => onChangeSearch(e)} class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search"/>
                <button onClick={()=>handlerRefresh()} class="btn btn-outline-success" type="submit">Refresh</button>
                </form>
                </div>
            </div>
            </nav>
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