import React from "react";
import style from "./styles/UserAdminCard.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UserAdminCard = ({ sub, nickname, email, setAdminFlag, setInput }) => {
  const addAdmin = async (e) => {
    e.preventDefault();
    setInput("");
    let modify = { statusAdmin: true };
    await axios.put(`/user/${sub}`, modify);
    setAdminFlag((prevAdminFlag) => !prevAdminFlag);
    setInput("");
  };

  const confirmAdmin = (e) => {
    confirmAlert({
      title: "Cambiar status usuario a Admin",
      message: "¿Está seguro?",
      buttons: [
        {
          label: "Sí",
          onClick: () => addAdmin(e),
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
        <div className={`col ${style.column}`}>
          <p>{nickname}</p>
        </div>
        <div className={`col ${style.column}`}>
          <p>{sub}</p>
        </div>
        <div className={`col ${style.column}`}>
          <p>{email}</p>
        </div>
        <div className={`col  ${style.column}`}>
          <button className={style.button} onClick={(e) => confirmAdmin(e)}>
            Agregar Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminCard;
