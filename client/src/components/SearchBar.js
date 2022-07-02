import React from 'react';
import style from './styles/SearchBar.module.css'


export default function SearchBar({setInput, setPage}) {
    
    const onChangeSearch = (e)=>{
      setPage(1)
      setInput(e.target.value);        
    }

    const handleRestart = (e)=> {
        e.preventDefault();
        setInput("");
        setPage(1)
    }


    return (
        <div className={style.questBox}>
          <div className={style.searchBar}>
            <input
              type="text"
              onChange={onChangeSearch}
              placeholder="Buscar..."
              autoComplete='off'
              className={style.input1}
              id='searchInput'
            />
            <button onClick={handleRestart}>
              Reiniciar
            </button>
          </div>
        </div>
    )
}