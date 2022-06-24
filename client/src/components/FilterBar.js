import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserQuestions } from '../redux/actions';
import style from "./styles/FilterBar.module.css"


export default function FilterBar() {

    const questions = useSelector(state=> state.questions)
    const userInfo = useSelector(state=> state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserQuestions(userInfo.sub))
    },[dispatch, userInfo.sub])


    function handleSelectAnswered(e){
        e.preventDefault()
        if(e.target.value === 'All') {
            dispatch(getUserQuestions(userInfo.sub));
        } 
        if(e.target.value === 'true') {
            dispatch(getUserQuestions(userInfo.sub));
        }    // falta crear accion
        if(e.target.value === 'false') {
            dispatch(getUserQuestions(userInfo.sub));
        }    // falta crear accion
    }


    return(
            <div>
                <p>
                    Filtrar por estado:
                </p>
                <select id='select' onChange={e=> handleSelectAnswered(e)}>
                    <option value='All'>Todas las preguntas</option>
                    <option value='true'>Respondidas</option>
                    <option value='false'>No Respondidas</option>
                </select>
            </div>
    )
}