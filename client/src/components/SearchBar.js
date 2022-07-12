import React from 'react';
import style from './styles/SearchBar.module.css'
import { TextField } from '@mui/material';


export default function SearchBar({setInput, setPage}) {
    
    const onChangeSearch = (e)=>{
      setPage(1)
      setInput(e.target.value);        
    }

    return (
        <div className={style.questBox}>
          <div className={style.searchBar}>
            <TextField onChange={onChangeSearch} type="search" label="Buscar..." variant="outlined"/>
          </div>
        </div>
    )
}