import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/Comentarios.module.css";
import axios from "axios";
import SubAnswerCard from "./SubAnswerCard";
import { useAuth0 } from "@auth0/auth0-react";

const Comentarios = ({ id, cantSubAnswers, subAnswers, setIsModify }) => {
  const userInfo = useSelector((state) => state.user);
  const { isAuthenticated } = useAuth0();

  var styleComentario = {
    marginBottom: cantSubAnswers > 0 ? "1.5vh" : "0vh",
  };

  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({});

  function validate(newSubAnswer) {
    let errors = {};
    if (!newSubAnswer.text) errors.text = "Se requiere una respuesta";
    if (newSubAnswer.text.length > 2000)
      errors.text = "La respuesta debe tener un máximo de 2000 caracteres";
    return errors;
  }

  const onChangeInputText = (e) => {
    setInput(e.target.value);
    setErrors(
      validate({
        text: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    await axios.post(`/subAnswer`, { sub: userInfo.sub, id, text: input });
    setIsModify((prevState) => !prevState);
    setInput("");
  };

  return (
    <div className={style.subAnsBox}>
      <div className={style.row1} style={styleComentario}>
        {subAnswers.length > 0 &&
          subAnswers.map(
            (e) =>
              !e.statusDeleted && (
                <SubAnswerCard
                  key={e.id}
                  sId={e.id}
                  picture={e.user.picture}
                  nickname={e.user.nickname}
                  text={e.text}
                  userSub={e.userSub}
                  setIsModify={setIsModify}
                />
              )
          )}
      </div>
      <div className={isAuthenticated ? style.row2 : style.none}>
        <textarea
          type="text"
          value={input}
          name="text"
          placeholder="Escribe tu comentario..."
          autoComplete="off"
          className={style.editText}
          onChange={(e) => onChangeInputText(e)}
        />
        <div className={style.button}>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className={style.submit}
            disabled={!input || errors.text}
          >
            Enviar comentario
          </button>
        </div>
      </div>
      {errors.text && (
        <div className={style.error}>
          <span> {errors.text}</span>
        </div>
      )}
    </div>
  );
};

export default Comentarios;
