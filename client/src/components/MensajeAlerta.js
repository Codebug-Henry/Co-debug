import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import style from "./styles/MensajeAlerta.module.css";

const MensajeAlerta = ({ textAlerta }) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className={style.custom}>
          <div className={style.title}>{textAlerta}</div>
          <button className={style.button} onClick={onClose}>
            OK
          </button>
        </div>
      );
    },
  });
};

export default MensajeAlerta;
