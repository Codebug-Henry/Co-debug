import React from "react";
import style from "./styles/UserCard.module.css";
import axios from "axios";

const UserCard = ({
  cantAns,
  cantQuest,
  email,
  locale,
  nickname,
  statusBanned,
  sub,
  points,
  setBanFlag,
}) => {
  const banUser = (e) => {
    e.preventDefault();
    let modify = { statusBanned: !statusBanned };
    axios
      .put(`/user/${sub}`, modify)
      .then((response) => setBanFlag((prevFlag) => !prevFlag));
  };

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row}`}>
        <div className={`col-2 ${style.column}`}>
          <p>{nickname}</p>
        </div>
        <div className={`col-3 ${style.column}`}>
          <p>{sub}</p>
        </div>
        <div className={`col-2 ${style.column}`}>
          <p>{email}</p>
        </div>
        <div className={`col-1  ${style.column}`}>
          <p>{locale}</p>
        </div>
        <div className={`col  ${style.column}`}>
          <p>{cantQuest}</p>
        </div>
        <div className={`col  ${style.column}`}>
          <p>{cantAns}</p>
        </div>
        <div className={`col  ${style.column}`}>
          <p>{points}</p>
        </div>
        <div className={`col  ${style.column}`}>
          <p>{String(statusBanned)}</p>
        </div>
        <div className={`col  ${style.column}`}>
          <button
            className={
              statusBanned === false ? style.unbanButton : style.banButton
            }
            onClick={(e) => banUser(e)}
          >
            Ban
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
