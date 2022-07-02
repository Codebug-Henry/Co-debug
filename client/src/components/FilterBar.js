import React from 'react';
import style from './styles/FilterBar.module.css'


export default function FilterBar({sort, setSort, setPage}) {
    
    const handleSort = (e) => {
        e.preventDefault()
        setPage(1)
        setSort(e.target.value)
    }

    return(
            <div>
                <select value={sort} className={style.select} onChange={handleSort}>
                    <option value='All'>Todas las preguntas</option>
                    <option value='true'>Respondidas</option>
                    <option value='false'>No Respondidas</option>
                </select>
            </div>
    )
}