import React, { useState } from "react";
import style from "./styles/AlertCard.module.css";
import { useDispatch } from "react-redux";

const AlertCard = ({ id,message,title,text,subCreator,questionSub}) => {
  //const [input, setInput] = useState("");
  //const dispatch = useDispatch();

  const handleSubmit = (e) => {
    
  };

  const handleChange = (e) => {
    
  };

  return (
    <div>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.row}`}>
            <div className={`col-lg ${style.column}`}>
              <p>{id}</p>
            </div>
            <div className={`col-lg-3 ${style.column}`}>
              <p>{subCreator}</p>
            </div>
            <div className={`col-lg-3 ${style.column}`}>
              <p>{questionSub}</p>
            </div>
            <div className={`col-lg ${style.column}`}>
              <p>{message}</p>
            </div>
            <div className={`col-lg ${style.column}`}>
              <p>{title}</p>
            </div>
            <div className={`col-lg ${style.column}`}>
              <p>{text}</p>
            </div>
            <div className={`col-lg  ${style.column}`}>
              <button className={style.button}>
                Borrar
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
