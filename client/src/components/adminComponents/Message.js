import React from "react";
import style from "./styles/Message.module.css"

const Message = ({title,text,email,sub,nickname}) => {

  const handleSubmit = (e)=>{

  }

  const handleChange = (e)=>{

  }

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
                <input
                 type="text"
                 onChange={(e)=>handleChange(e)}
                 />
            </div>
            <div>
                <button onClick={(e)=>handleSubmit(e)}>Responder</button>
            </div>
        </div>
    </div>
  )
};

export default Message;
