import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from "./styles/Ranking.module.css";
import Footer from "../components/Footer.js";
import { getRanking } from "../redux/actions";

const Ranking = () => {
  const dispatch = useDispatch()
  const ranking = useSelector(state => state.ranking)
  const pages = useSelector(state => state.pages)
  const [sort, setSort] = useState('desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getRanking(sort, page))
  }, [dispatch, sort, page])

  const handleClick = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.value));
  };

  const handleSort = (e) => {
    setSort(e.target.value)
  }


  return (
    <div className={style.fullContainer}>
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div>
            <select value={sort} onChange={handleSort}>
              <option value='asc'>Ascendente</option>
              <option value='desc'>Descendente</option>
            </select>
          </div>
          <div className={`container-fluid${style.container}`}>
            {ranking.map(e => (
              <div className={`row ${style.puestos}`} key={e.sub}>
              <div>
                <p className={style.Titulo}>PUESTO {e.myPosition}</p>
                <p>{e.name}</p>
                <p>Puntos: {e.myTeachPoints}</p>
              </div>
            </div>
            ))}
          </div>
          <div className={style.paginado}>
        {pages?.map((e) => (
            <button key={e} onClick={(e) => handleClick(e)} value={e}>
              {e}
            </button>
          ))}
      </div>
        </div>      
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Ranking;
