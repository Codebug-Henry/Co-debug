import React, { useState } from "react";
import style from "./styles/Message.module.css";
import { putMessage } from "../../redux/api";

const Message = ({ title, text, email, sub, nickname, id }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    let answer = input;
    let paquete = { id, title, email, answer };
    e.preventDefault();
    putMessage(paquete);
    alert("El mensaje ha sido respondido");
    setInput("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.title}>
          <p>{title}</p>
        </div>
        <p>{nickname}</p>
        <p>{email}</p>
        <p>{sub}</p>
      </div>
      <div className={style.text}>
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
