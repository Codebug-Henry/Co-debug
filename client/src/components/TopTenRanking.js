import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/TopTenRanking.module.css";
// import { getTopTenRanking } from "../redux/api";
// import { useEffect } from "react";
import TopTenCard from "./TopTenCard";

const TopTenRanking = () => {
  // const dispatch = useDispatch();
  const topTen = useSelector((state) => state.topTenRanking);
  console.log(topTen);

  // useEffect(() => {
  //   dispatch(getTopTenRanking());
  // }, [dispatch]);

  return (
    <div>
      <div>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.info}`}>
            <p className={`col-lg-2`}>Posición</p>
            <p className={`col-lg-7`}>Nickname</p>
            <p className={`col-lg-3`}>Puntos</p>
          </div>
        </div>

        {topTen ? (
          <>
            {topTen?.map((e) => {
              return (
                <div className={`row ${style.mapeando} `} key={e.sub}>
                  <TopTenCard
                    position={e.myPosition}
                    nickname={e.nickname}
                    points={e.myTeachPoints}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div>No se encontraron usuarios</div>
        )}
      </div>
    </div>
  );
};

export default TopTenRanking;
