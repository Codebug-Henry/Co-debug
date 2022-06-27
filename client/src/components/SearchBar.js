import React from 'react';
import { useDispatch } from 'react-redux';
import { getUserQuestions } from '../redux/actions';
import style from './styles/SearchBar.module.css'


export default function SearchBar({userInfo, page, input, setInput}) {

    const dispatch = useDispatch();
    
    const onChangeSearch = (e)=>{
        setInput(e.target.value);
        document.getElementById("selectAnswered").getElementsByTagName('option')[0].selected = 'selected';
        dispatch(getUserQuestions(userInfo.sub, page, e.target.value,));
    }

    const handleRestart = (e)=>{
        e.preventDefault();
        setInput("");
        document.getElementById("selectAnswered").getElementsByTagName('option')[0].selected = 'selected';
        dispatch(getUserQuestions(userInfo.sub, page, ''));
    }


    return (
        <div className={style.questBox}>
          <div className={style.searchBar}>
            <input
              type="text"
              value={input}
              onChange={(e) => onChangeSearch(e)}
              placeholder="Buscar..."
              autoComplete='off'
              className={style.input1}
              id='searchInput'
            />
            <button onClick={(e) => handleRestart(e)} value={input}>
              Reiniciar
            </button>
          </div>
        </div>
    )
}