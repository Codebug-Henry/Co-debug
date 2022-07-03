import React from "react";
import style from "./styles/TopTenCard.module.css";

const TopTenCard = ({ nickname, position, points }) => {
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row}`}>
        <div className={`col-lg-2 ${style.column}`}>
          <p>{position}</p>
        </div>
        <div className={`col-lg-7 ${style.column}`}>
          <p>{nickname}</p>
        </div>
        <div className={`col-lg-3  ${style.column}`}>
          <p>{points}</p>
        </div>
      </div>
    </div>
  );
};

export default TopTenCard;
