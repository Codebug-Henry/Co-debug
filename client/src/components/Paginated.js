import React from 'react';
import { useSelector } from 'react-redux';
import style from './styles/Paginated.module.css'


export default function Paginated({page, setPage, totalPages}) {

    const pages = useSelector((state) => state.pages);

    const handleClick = (e) => {
        e.preventDefault();
        setPage(parseInt(e.target.value));
    };

    function handlePrev(e){
        e.preventDefault();
        setPage(prev => prev -1);
    }

    function handleNext(e){
        e.preventDefault();
        setPage(prev => prev +1);
    }

    console.log(totalPages)
    return(
        <div className={style.bar}>
            <ul> 
                <button className={page - 1 === 0 || pages.length === 0 ? style.not : style.prev} onClick={e=>handlePrev(e)} > Anterior </button>
                <button className={page > 3 ? style.one : style.not} onClick={e=>setPage(1)}> 1 </button>
                <button className={page > 4 ?style.firstDot : style.not}> ... </button>
                {pages &&
                    pages.map((pag) =>(
                        <li key={pag}>
                            <button id={style.number} 
                                    className={page === pag ? style.active : null} 
                                    onClick={(e)=> handleClick(e)}
                                    value={pag}> 
                                {pag}
                            </button>
                        </li>
                    ))
                }
                <button className={page < totalPages -3 ? style.lastDot : style.not}> ... </button>
                <button className={page < totalPages -2 ? style.last : style.not} onClick={e=>setPage(totalPages)}> {totalPages} </button>
                <button className={page === totalPages || pages.length === 0 ? style.not : style.next} onClick={e=> handleNext(e)} > Siguiente </button>
            </ul>
        </div>
    )
}