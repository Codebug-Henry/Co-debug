import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserQuestions, getUserQuestionsOrderer } from '../redux/actions';
import style from './styles/FilterBar.module.css'


export default function FilterBar({page, setPage, setInput}) {

    const userInfo = useSelector(state=> state.user)
    const dispatch = useDispatch()

    function handleSelectAnswered(e){
        e.preventDefault()
        if(e.target.value === 'All') {
            setInput('');
            dispatch(getUserQuestions(userInfo.sub, page, ''));
        } 
        if(e.target.value === 'true') {
            setInput('');
            dispatch(getUserQuestionsOrderer(userInfo.sub, e.target.value, page));
        }    
        if(e.target.value === 'false') {
            setInput('');
            dispatch(getUserQuestionsOrderer(userInfo.sub, e.target.value, page));

        }    
    }

    return(
            <div>
                <select className={style.select} id='selectAnswered' onChange={e=> handleSelectAnswered(e)}>
                    <option value='All'>Todas las preguntas</option>
                    <option value='true'>Respondidas</option>
                    <option value='false'>No Respondidas</option>
                </select>
            </div>
    )
}