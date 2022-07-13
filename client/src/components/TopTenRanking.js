import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/TopTenRanking.module.css";
import { getTopTenRanking } from "../redux/actions";
import { useEffect } from "react";
import TopTenCard from "./TopTenCard";
import oro from '../images/oro.png';
import plata from '../images/plata.png';
import bronce from '../images/bronce.png';

const TopTenRanking = () => {
  const dispatch = useDispatch();
  const topTen = useSelector((state) => state.topTenRanking);

  useEffect(() => {
    dispatch(getTopTenRanking());
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.info}`}>
            <p className={`col-2 ${style.nro}`}>Nro.</p>
            <p className={`col-7 ${style.nick}`}>Nickname</p>
            <p className={`col-3 ${style.puntos}`}>Puntos</p>
          </div>
        </div>

        {topTen && (
          <>
            {topTen?.map((e) => e.myPosition === 1 ? 
                <div className={`row ${style.top1} `} key={e.sub}>
                  <TopTenCard
                    position= {<img src={oro} className={style.medal} alt="1" />}
                    nickname={e.nickname}
                    points={e.myTeachPoints}
                    sub={e.sub}
                  />
                </div>
             : null )}
          </>
        )}

        {topTen && (
          <>
            {topTen?.map((e) => e.myPosition === 2 ? 
                <div className={`row ${style.top2} `} key={e.sub}>
                  <TopTenCard
                    position= {<img src={plata} className={style.medal} alt="2" />}
                    nickname={e.nickname}
                    points={e.myTeachPoints}
                    sub={e.sub}
                  />
                </div>
             : null )}
          </>
        )}

        {topTen && (
          <>
            {topTen?.map((e) => e.myPosition === 3 ? 
                <div className={`row ${style.top3} `} key={e.sub}>
                  <TopTenCard
                    position= {<img src={bronce} className={style.medal} alt="3" />}
                    nickname={e.nickname}
                    points={e.myTeachPoints}
                    sub={e.sub}
                  />
                </div>
             : null )}
          </>
        )}
        

        {topTen ?
          <>
            {topTen?.map((e) => e.myPosition > 3 ?
                <div className={`row ${style.mapeando} `} key={e.sub}>
                  <TopTenCard
                    position={e.myPosition}
                    nickname={e.nickname}
                    points={e.myTeachPoints}
                    sub={e.sub}
                  />
                </div> 
              : null
            )}
          </> :
          <div> No se encontraron usuarios </div>
        }
      </div>
    </div>
  );
};

export default TopTenRanking;
