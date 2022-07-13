import React from "react";
import style from "./styles/TopTenCard.module.css";
import { Link } from "react-router-dom";

const TopTenCard = ({ nickname, position, points, sub }) => {
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row}`}>
        <div className={`col-2 ${style.column}`}>
          <p>{position}</p>
        </div>
        <div className={`col-7 ${style.column}`}>
          <Link to={`/user/${sub}`} className={style.toUser}>
            <p>{nickname}</p>
          </Link>
        </div>
        <div className={`col-3  ${style.column}`}>
          <p>{points}</p>
        </div>
      </div>
    </div>
  );
};

export default TopTenCard;
