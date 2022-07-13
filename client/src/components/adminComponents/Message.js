import React, { useState } from "react";
import style from "./styles/Message.module.css";
import { useDispatch, useSelector } from "react-redux";
import { putMessage } from "../../redux/actions";
import MensajeAlerta from "../MensajeAlerta";

const Message = ({ title, text, email, sub, nickname, id, setMessageFlag }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const textAlerta = "El mensaje ha sido respondido";

  const handleSubmit = (e) => {
    let answer = input;
    let paquete = { id, title, email, answer };
    e.preventDefault();
    dispatch(putMessage(paquete, setMessageFlag));
    MensajeAlerta({ textAlerta });
    setMessageFlag(prevMessageFlag => !prevMessageFlag)
    setInput("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const dark = useSelector((state)=> state.dark)

  const darkmode = {
    backgroundColor: dark ? "rgb(11, 13, 43)" : null,
    color: dark ? "rgb(199, 199, 201)" : null,
    boxShadow: '0px 0px 2px white',
    border: dark ? "none" : null,
    marginBottom: dark ? "2px" : "2px"
  }

  const darkLetter = {
    color: dark ? "black" : null,
  }


  return (
    <div className={style.container} style={darkmode}>
      <div className={style.info}>
        <div className={style.title}>
          <p>{title}</p>
        </div>
        <p>{nickname}</p>
        <p>{email}</p>
        <p>{sub}</p>
      </div>
      <div className={style.text} style={darkLetter}>
        <p>{text}</p>
      </div>
      <div className={style.form}>
        <div className={style.input}>
          <input type="text" onChange={(e) => handleChange(e)} value={input} />
        </div>
        <div>
          <button className={style.button} onClick={(e) => handleSubmit(e)}>
            Responder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
