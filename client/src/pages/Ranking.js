import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from "./styles/Ranking.module.css";
import Footer from "../components/Footer.js";
import Paginated from "../components/Paginated";
import { cleanRanking, getRanking } from "../redux/actions";

const Ranking = () => {
  const dispatch = useDispatch()
  const ranking = useSelector(state => state.ranking)
  const [sort, setSort] = useState('points-desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getRanking(sort, page))
    return () => dispatch(cleanRanking())
  }, [dispatch, sort, page])

  const handleSort = (e) => {
    setSort(e.target.value)
  }

  return (
    <div className={style.fullContainer}>
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={style.filterbar}>
            <select className={style.select} value={sort} onChange={handleSort}>
              <option value='points-desc'>Teach Points descendente</option>
              <option value='points-asc'>Teach Points ascendente</option>
              <option value='quest-desc'>Preguntas descendente</option>
              <option value='quest-asc'>Preguntas ascendente</option>
              <option value='answ-desc'>Respuestas descendente</option>
              <option value='answ-asc'>Resputas ascendente</option>
            </select>
          </div>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row align-items-start ${style.columnsname}`}>
              <p className={`col-1`}></p>
              <p className={`col-1`}>Posición</p>
              <p className={`col`}>Nickname</p>
              <p className={`col`}>Teach Points</p>
              <p className={`col`}>Respuestas</p>
              <p className={`col`}>Preguntas</p>
            </div>
            {ranking.map(e => (
              <div className={`row align-items-start ${style.info}`} key={e.sub}>
                <img src={e.picture} className={`col-1 ${style.userImage}`} referrerPolicy="no-referrer" alt={e.name}/>
                <p className={`col-1`}>{e.myPosition}</p>
                <p className={`col`}>{e.nickname}</p>
                <p className={`col`}>{e.myTeachPoints}</p>
                <p className={`col`}>{e.cantAns}</p>
                <p className={`col`}>{e.cantQuest}</p>
            </div>
            ))}
          </div>
          <Paginated page={page} setPage={setPage} />
        </div>      
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Ranking;