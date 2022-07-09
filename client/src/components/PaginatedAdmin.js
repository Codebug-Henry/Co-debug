import React from "react";
import style from "./styles/Paginated.module.css";

export default function PaginatedAdmin({ setPage, pages }) {

  
  const handleClick = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.value));
  };

  return(
    <div className={style.bar}>
        <ul> 
            { pages &&
                pages.map(number =>(
                        <button key={number} className={style.number} onClick={(e) => handleClick(e)} value={number}> {number} </button>
                ))
            }
        </ul>
    </div>
)
}

