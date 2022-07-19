import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/CardUserQuestion.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import Tooltip from "@mui/material/Tooltip";
import { deleteQuestion, modifyQuestion } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Highlighter from "./Highlighter";
import WhatsPop from "./WhatsPop";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const CardUserQuestion = ({
  id,
  title,
  text,
  likes,
  cantAnswers,
  name,
  picture,
  setCantFirstLast,
  setIsModify,
  statusValidated,
  macroTags,
  microTags,
}) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.userQuestions);
  const [style1, setStyle1] = useState(true);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [newQuestion, setnewQuestion] = useState({
    id: id,
    title: title,
    text: text,
  });

  function validate(newQuestion) {
    let errors = {};
    if (!newQuestion.title) errors.title = "Se requiere un título";
    if (newQuestion.title.length > 80)
      errors.title = "Título debe tener un máximo de 80 caracteres";
    if (!newQuestion.text) errors.text = "Se requiere una pregunta";
    if (newQuestion.text.length > 6000)
      errors.text = "La pregunta debe tener un máximo de 6000 caracteres";
    return errors;
  }

  const confirm = (e) => {
    confirmAlert({
      title: "Confirma borrar la pregunta",
      message: "¿Está seguro de esto?",
      buttons: [
        {
          label: "Sí",
          onClick: (e) => handleDeleteQuestion(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  function toRender() {
    style1 === true ? setStyle1(false) : setStyle1(true);
  }

  function handleDeleteQuestion(e) {
    setIsModify(true);
    dispatch(deleteQuestion({ id: id, statusDeleted: true }, setIsModify));
    setCantFirstLast([questions.length, questions[1], questions[4]]);
  }

  function handleEditQuestion(e) {
    e.preventDefault();
    toRender();
  }

  const handleConfirmQuestion = (e) => {
    e.preventDefault();
    setIsModify(true);
    dispatch(modifyQuestion(newQuestion, setIsModify));
    toRender();
  };

  function onChangeInputTitle(e) {
    setnewQuestion({
      ...newQuestion,
      title: e.target.value,
    });
    setErrors(
      validate({
        ...newQuestion,
        title: e.target.value,
      })
    );
  }

  function onChangeInputText(e) {
    setnewQuestion({
      ...newQuestion,
      text: e.target.value,
    });
    setErrors(
      validate({
        ...newQuestion,
        text: e.target.value,
      })
    );
  }

  function onClickAdd(e) {
    navigate(`/responder/${id}`);
  }

  function handleClick() {
    setnewQuestion({
      ...newQuestion,
      text:
        newQuestion.text +
        "\n```javascript\n(escribe tu código javascript aquí)\n```",
    });
  }

  return (
    <div id={statusValidated ? style.validated : style.questionCard}>
      <div id={style.left}>
        <div id={style.first}>
          <div id={style.name}>
            <div className={statusValidated ? style.success : style.none}>
              <Tooltip title="Pregunta Validada">
                <TaskAltIcon color="success" fontSize="large" />
              </Tooltip>
            </div>
            <div id={style.photo}>
              <Avatar
                alt={name}
                src={picture}
                id={style.avatar}
                referrerPolicy="no-referrer"
              />
            </div>
            <div id={style.user}>
              <span>{name}</span>
            </div>
          </div>
          <div id={style1 === true ? style.theme : style.editFull}>
            <span>{title}</span>
          </div>
          <div className={style1 === true ? style.editFull : style.editTitle}>
            <TextField
              id="standard-basic"
              label="Edita el título"
              variant="standard"
              size="small"
              defaultValue={title}
              onChange={(e) => onChangeInputTitle(e)}
            />
            <div className={style.btnJS}>
              <button
                type="button"
                className={style.btnCode}
                onClick={handleClick}
              >
                {" "}
                Código Javascript{" "}
              </button>
            </div>
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
              value={newQuestion.text}
              name="text"
              autoComplete="off"
              className={style.editText}
              onChange={(e) => onChangeInputText(e)}
            />
            {errors.title && (
              <div className={style.error}>
                <span> {errors.title}</span>
              </div>
            )}
            {errors.text && (
              <div className={style.error}>
                <span> {errors.text}</span>
              </div>
            )}
          </div>
          <div
            className={
              style1 === true || errors.title || errors.text
                ? style.editFull
                : style.editBtn
            }
          >
            <CheckIcon
              fontSize="large"
              color="primary"
              cursor="pointer"
              className={style.confirmEdit}
              onClick={handleConfirmQuestion}
            />
          </div>
        </div>
        <div id={style.tags}>
          {macroTags?.map((macro) => (
            <span key={macro.tag} className={style.tag}>
              {" "}
              #{macro.tag}{" "}
            </span>
          ))}
          {microTags?.map((micro) => (
            <span key={micro.tag} className={style.tag}>
              {" "}
              #{micro.tag}{" "}
            </span>
          ))}
        </div>
      </div>

      <div id={style.right}>
        <div>
          <span>Likes: {likes}</span>
        </div>
        <div>
            <WhatsPop idUser={id} />
        </div>
        <div>
          <Tooltip title="Click para ver">
            <span onClick={(e) => onClickAdd(e)} className={style.resp}>
              {" "}
              Ver {cantAnswers} respuestas{" "}
            </span>
          </Tooltip>
        </div>
        <div className={style.btns}>
          <div className={statusValidated ? style.none : null}>
            <Tooltip title="Editar">
              <EditIcon
                fontSize="medium"
                className={style.moreBtn}
                onClick={(e) => handleEditQuestion(e)}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Eliminar">
              <DeleteIcon
                fontSize="medium"
                className={style.deleteBtn}
                onClick={(e) => confirm(e)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserQuestion;
