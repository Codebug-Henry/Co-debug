import React from "react";
import style from "./styles/UserCard.module.css";
//import { useDispatch } from "react-redux";
//import { putUserInfo } from "../../redux/api";
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
  // setFlag,
  setBanFlag,
}) => {
  //const dispatch = useDispatch();

  const banUser = (e) => {
    e.preventDefault();
    let modify = { statusBanned: !statusBanned };
    axios
      .put(`http://localhost:3001/user/${sub}`, modify)
      .then((response) => setBanFlag((prevFlag) => !prevFlag));
  };

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row}`}>
        <div className={`col-lg-2 ${style.column}`}>
          <p>{nickname}</p>
        </div>
        <div className={`col-lg-3 ${style.column}`}>
          <p>{sub}</p>
        </div>
        <div className={`col-lg-2 ${style.column}`}>
          <p>{email}</p>
        </div>
        <div className={`col-lg-1  ${style.column}`}>
          <p>{locale}</p>
        </div>
        <div className={`col-lg  ${style.column}`}>
          <p>{cantQuest}</p>
        </div>
        <div className={`col-lg  ${style.column}`}>
          <p>{cantAns}</p>
        </div>
        <div className={`col-lg  ${style.column}`}>
          <p>{points}</p>
        </div>
        <div className={`col-lg  ${style.column}`}>
          <p>{String(statusBanned)}</p>
        </div>
        <div className={`col-lg  ${style.column}`}>
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
