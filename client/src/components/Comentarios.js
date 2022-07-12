import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Comentarios.module.css";
import axios from "axios";

const Comentarios = ({ id, cantSubAnswers, subAnswers, setIsModify }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user);

    var styleComentario = {
        marginBottom: cantSubAnswers > 0 ? "1.5vh" : "0vh"
    }

    var styleRow2 = {
        width: cantSubAnswers === 0 ? "40vw" : null
    }

    const [input, setInput] = useState("");

    const handleDeleteSubAnswer = async (id) => {
        let deletePack = { id, statusDeleted: true };
        await axios.put(`/subAnswer`, deletePack);
        setIsModify(prevState=> !prevState)
    };

    const handleModifySubAnswer = async (id) => {
        let modifyPack = { id, text: true };
        await axios.put(`/subAnswer`, modifyPack);
        setIsModify(prevState=> !prevState)
    };

    const onChangeInputText = (e) => {
        setInput(e.target.value);
    }
      
      const handleSubmit = async (e) => {
        await axios.post(`/subAnswer`, { sub: userInfo.sub, id, text: input });
        setIsModify(prevState=> !prevState)
        setInput("");
    };

    return (
      <div className={style.subAnsBox}>
        <div className={style.row1} style={styleComentario}>
            {subAnswers.length > 0 &&
                subAnswers.map((e) => (
                    <div key={e.id} className={style.comentarioContainer}>
                        <div className={style.comentario}>
                            <div>
                                <img
                                    src={e.user.picture}
                                    className={style.userImage}
                                    referrerPolicy="no-referrer"
                                    alt="imgUser"
                                />
                                <p>
                                    {e.user.nickname}
                                </p>       
                            </div>
                            <p className={style.texto}>
                                {e.text}
                            </p>

                        </div>
                    </div>
                ))
            }
        </div>
        <div className={style.row2} style={styleRow2}>
            <textarea
                type="text"
                value={input}
                name="text"
                autoComplete="off"
                className={style.editText}
                onChange={(e) => onChangeInputText(e)}
            />
            <div className={style.button}>
                <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    className={style.submit}
                    disabled={!input}
                >
                    Enviar comentario
                </button>
            </div>
        </div>
      </div>
    );
};

export default Comentarios;
