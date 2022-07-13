import React from "react";
import style from "./styles/UserCard.module.css";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";

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

  const confirmBanUser = (e) => {
    confirmAlert({
      title: "Cambiar statusBan del usuario",
      message: "¿Está seguro?",
      buttons: [
        {
          label: "Sí",
          onClick: () => banUser(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const dark = useSelector((state) => state.dark);

  const darkmode = {
    backgroundColor: dark ? "rgb(11, 13, 43)" : null,
    color: dark ? "rgb(199, 199, 201)" : null,
    boxShadow: "0px 0px 2px white",
    border: dark ? "none" : null,
    marginBottom: dark ? "2px" : "2px",
  };

  return (
    <div className={`container-fluid ${style.container}`} style={darkmode}>
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
            // onClick={(e) => banUser(e)}
            onClick={(e) => confirmBanUser(e)}
          >
            Ban
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
