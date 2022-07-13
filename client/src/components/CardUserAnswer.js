import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./styles/CardUserAnswer.module.css";
import ReactMarkdown from "react-markdown";
import Highlighter from "./Highlighter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import { putAnswer } from "../redux/actions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const CardUserAnswer = ({
  id,
  qid,
  title,
  text,
  likes,
  tPoints,
  setIsModify,
  statusValidated,
  nickname,
  picture,
  sub
}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [style1, setStyle1] = useState(true);
  const [errors, setErrors] = useState({});
  const [newAnswer, setNewAnswer] = useState({
    sub: user.sub,
    id: id,
    text: text,
  });

  function validate(newAnswer) {
    let errors = {};
    if (!newAnswer.text) errors.text = "Se requiere una respuesta";
    if (newAnswer.text.length > 600)
      errors.text = "La respuesta debe tener un máximo de 600 caracteres";
    return errors;
  }

  function toRender() {
    style1 === true ? setStyle1(false) : setStyle1(true);
  }

  function handleDeleteAnswer(e) {
    e.preventDefault();
    setIsModify(true);
    dispatch(
      putAnswer({ id: id, statusDeleted: true, sub: user.sub }, setIsModify)
    );
  }

  function handleEditAnswer(e) {
    e.preventDefault();
    toRender();
  }

  const handleConfirmAnswer = (e) => {
    e.preventDefault();
    setIsModify(true);
    dispatch(putAnswer(newAnswer, setIsModify));
    toRender();
  };

  function onChangeInputText(e) {
    setNewAnswer({
      ...newAnswer,
      text: e.target.value,
    });
    setErrors(
      validate({
        text: e.target.value,
      })
    );
  }

  function handleClick() {
    setNewAnswer({
      ...newAnswer,
      text:
        newAnswer.text +
        "\n```javascript\n(escribe tu código javascript aquí)\n```",
    });
  }

  return (
    <div
      className={
        statusValidated
          ? `container-fluid ${style.validated}`
          : `container-fluid ${style.total}`
      }
    >
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <Link to={`/user/${sub}`} className={style.toUser}>
            <img
              className={style.userImage}
              src={picture}
              alt={nickname}
              referrerPolicy="no-referrer"
            />
          </Link>
          <div className={statusValidated ? style.success : style.none}>
            <TaskAltIcon color="success" fontSize="large" />
          </div>
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>
          <div className={style.TitleAndExtrasBox}>
            <div className={style.firstRow}>
              <div className={style.userPreg}>
                <span>Pregunta de </span>
                <Link to={`/user/${sub}`} className={style.toUser}>
                  <span>{nickname}: {title}</span>
                </Link>
              </div>

              <div className={style.Extras}>
                <span>Teach Points: {tPoints}</span>
              </div>
            </div>
            <div className={style.Title}>
              <span>Tu respuesta:</span>
            </div>
          </div>

          <div id={style1 === true ? style.question : style.question2}>
            <div id={style1 === true ? style.divQuest : style.editFull}>
              <ReactMarkdown
                children={text}
                className={style.markdown}
                components={{ code: Highlighter }}
              />
            </div>

            <div className={style1 === true ? style.editFull : style.editFull2}>
              <textarea
                type="text"
                value={newAnswer.text}
                name="text"
                autoComplete="off"
                className={style.editText}
                onChange={(e) => onChangeInputText(e)}
              />
              {errors.text && (
                <div className={style.error}>
                  <span> {errors.text}</span>
                </div>
              )}
            </div>

            <div id={style1 === true ? style.editBtn : style.editFull}></div>

            <div className={style1 === true ? style.editFull : style.editBtn}>
              <button
                type="button"
                className={style.btnCode}
                onClick={handleClick}
              >
                {" "}
                Javascript{" "}
              </button>
              <CheckIcon
                fontSize="large"
                color="primary"
                cursor="pointer"
                className={errors.text ? style.hidden : style.confirmEdit}
                onClick={handleConfirmAnswer}
              />
            </div>
          </div>

          <div className={style.bajoTexto}>
            <div className={style.cantLikes}>Likes: {likes}</div>
            <div>
              <Tooltip title="Editar">
                <EditIcon
                  fontSize="medium"
                  className={statusValidated ? style.hidden : style.moreBtn}
                  onClick={handleEditAnswer}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Eliminar">
                <DeleteIcon
                  fontSize="medium"
                  className={style.deleteBtn}
                  onClick={handleDeleteAnswer}
                />
              </Tooltip>
            </div>
            <div>
              <Link to={`/responder/${qid}`}>
                <button className={style.answerIt}>Ver pregunta</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-0 ${style.rightBox}`}></div>
    </div>
  );
};

export default CardUserAnswer;
