import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserQuestions, getSearchQuestions } from '../redux/actions';
import style from './styles/SearchBar.module.css'


export default function FilterBar({userInfo, page}) {

    const dispatch = useDispatch();
    const [input, setInput] = useState("");


    const onChangeSearch = (e)=>{
        setInput(e.target.value);
        dispatch(getSearchQuestions(e.target.value, page));
    }

    const handleRestart = (e)=>{
        e.preventDefault();
        setInput("");
        dispatch(getUserQuestions(userInfo.sub, page));
    }


    return (
        <div className={style.questBox}>
          <div className={style.searchBar}>
            <input
              type="text"
              value={input}
              onChange={(e) => onChangeSearch(e)}
              placeholder="Buscar..."
              id={style.input1}
            ></input>
            <button onClick={(e) => handleRestart(e)} value={input}>
              Reiniciar
            </button>
          </div>
        </div>
    )
}