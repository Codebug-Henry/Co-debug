import React from 'react';
import { useSelector } from 'react-redux';
import style from './styles/Paginated.module.css'


export default function Paginated({page, setPage}) {

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

    return(
        <div className={style.bar}>
            <ul> 
                <button className={style.prev} onClick={e=>handlePrev(e)} disabled={page - 1 === 0 ? true : false}> Prev </button>
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
                <button className={style.next} onClick={e=> handleNext(e)} disabled={page === pages.length || 1 ? true : false}> Next </button>
            </ul>
        </div>
    )
}