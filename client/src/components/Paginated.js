import React from "react";
import { useSelector } from "react-redux";
import style from "./styles/Paginated.module.css";

export default function Paginated({ page, setPage }) {
  const pages = useSelector((state) => state.pages);
  const totalPages = useSelector((state) => state.totalPages);
  
  const handleClick = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.value));
  };

  function handlePrev(e) {
    e.preventDefault();
    setPage((prev) => prev - 1);
  }

  function handleNext(e) {
    e.preventDefault();
    setPage((prev) => prev + 1);
  }

  return (
    <div className={style.bar}>
      <ul>
        <button
          className={
            page === 1 || pages.length === 0 ? style.notDisplay : style.prev
          }
          onClick={(e) => handlePrev(e)}
        >
          {" "}
          Anterior{" "}
        </button>
        <button
          className={page > 3 ? style.one : style.notDisplay}
          onClick={(e) => setPage(1)}
        >
          {" "}
          1{" "}
        </button>
        <button className={page > 4 ? style.firstDot : style.notDisplay}>
          {" "}
          ...{" "}
        </button>

        {page && page > 2 ? (
          <button
            className={style.number}
            onClick={(e) => handleClick(e)}
            value={page - 2}
          >
            {page - 2}
          </button>
        ) : null}
        {page && page > 1 ? (
          <button
            className={style.number}
            onClick={(e) => handleClick(e)}
            value={page - 1}
          >
            {page - 1}
          </button>
        ) : null}
        <button
          className={style.active}
          onClick={(e) => handleClick(e)}
          value={page}
        >
          {page}
        </button>
        {page && page + 1 <= totalPages ? (
          <button
            className={style.number}
            onClick={(e) => handleClick(e)}
            value={page + 1}
          >
            {page + 1}
          </button>
        ) : null}
        {page && page + 2 <= totalPages ? (
          <button
            className={style.number}
            onClick={(e) => handleClick(e)}
            value={page + 2}
          >
            {page + 2}
          </button>
        ) : null}

        <button
          className={page < totalPages - 3 ? style.lastDot : style.notDisplay}
        >
          {" "}
          ...{" "}
        </button>
        <button
          className={page < totalPages - 2 ? style.last : style.notDisplay}
          onClick={(e) => setPage(totalPages)}
        >
          {" "}
          {totalPages}{" "}
        </button>
        <button
          className={
            page === totalPages || pages.length === 0
              ? style.notDisplay
              : style.next
          }
          onClick={(e) => handleNext(e)}
        >
          {" "}
          Siguiente{" "}
        </button>
      </ul>
    </div>
  );
}
