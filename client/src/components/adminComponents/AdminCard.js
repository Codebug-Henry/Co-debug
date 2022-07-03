import axios from "axios";
//import React, { useState } from "react";
import style from "./styles/AdminCard.module.css";

const AdminCard = ({ sub, nickname, email, setFlag, setNoAdminFlag }) => {
  const removeAdmin = (e) => {
    e.preventDefault();
    let modify = { statusAdmin: false };
    axios
      .put(`/user/${sub}`, modify)
      .then((response) => setFlag((prevFlag) => !prevFlag));
  };

  return (
    <div>
      <div className={`container-fluid ${style.container}`}>
        <div className={`row ${style.row}`}>
          <div className={`col-lg ${style.column}`}>
            <p>{nickname}</p>
          </div>
          <div className={`col-lg ${style.column}`}>
            <p>{sub}</p>
          </div>
          <div className={`col-lg ${style.column}`}>
            <p>{email}</p>
          </div>
          <div className={`col-lg  ${style.column}`}>
            <button className={style.button} onClick={(e) => removeAdmin(e)}>
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
