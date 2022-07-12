import React, { useState, useEffect, useRef } from "react";
import style from "./styles/SimpleAnswer.module.css";
import ReactMarkdown from "react-markdown";
import Highlighter from "./Highlighter";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";
import { putAnswer } from "../redux/actions";
import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { Avatar } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DownloadIcon from '@mui/icons-material/Download';
import Comentarios from "./Comentarios";

const SimpleAnswer = ({
  id,
  text,
  likes,
  name,
  picture,
  subQ,
  subR,
  statusValidated,
  setIsModify,
  cantSubAnswers,
  subAnswers
}) => {

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const question = useSelector((state) => state.question);
  const liked = userInfo.ansLiked?.includes(id);
  const disliked = userInfo.ansDisliked?.includes(id);
  const [style1, setStyle1] = useState(true);
  const [errors, setErrors] = useState({});
  const [imgIncludes, setImgIncludes] = useState(false)
  const [newAnswer, setNewAnswer] = useState({
    sub: userInfo.sub,
    id: id,
    text: text,
  });
  
  useEffect(() => {
    if(text.includes("(https://res.cloudinary.com")) setImgIncludes(true)
  }, [text, imgIncludes]);


  function validate(newAnswer) {
    let errors = {};
    if (!newAnswer.text) errors.text = "Se requiere una respuesta";
    if (newAnswer.text.length > 600) errors.text = "La respuesta debe tener un máximo de 600 caracteres";
    return errors;
  }

  const handlerChooseQuestion = () => {
    confirmAlert({
      title: "Confirma elegir pregunta favorita",
      message: "¿Está seguro de esto?",
      buttons: [
        {
          label: "Sí",
          onClick: () => validateAnswer(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handlerCheckDelete = (e) => {
    confirmAlert({
      title: "Confirma borrar esta respuesta",
      message: "¿Está seguro de esto?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handleDeleteAnswer(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  function addLike(e) {
    e.preventDefault();
    if (!liked) {
      dispatch(
        putAnswer({ id: id, like: "add", sub: userInfo.sub }, setIsModify)
      );
    }
  }

  function removeLike(e) {
    e.preventDefault();
    if (!disliked) {
      dispatch(
        putAnswer({ id: id, like: "remove", sub: userInfo.sub }, setIsModify)
      );
    }
  }

  function validateAnswer() {
    dispatch(
      putAnswer(
        { id: id, statusValidated: true, sub: userInfo.sub },
        setIsModify
      )
    );
  }

  function toRender() {
    style1 === true ? setStyle1(false) : setStyle1(true);
  }

  function handleDeleteAnswer(e) {
    e.preventDefault();
    setIsModify(true);
    dispatch(
      putAnswer({ id: id, statusDeleted: true, sub: userInfo.sub }, setIsModify)
    );
  }

  function handleEditAnswer(e) {
    e.preventDefault();
    toRender();
  }

  async function handleConfirmAnswer(e) {
    e.preventDefault();
    setIsModify(true);
    await dispatch(putAnswer(newAnswer, setIsModify));
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

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeAlert = (e) => {
    setSelected(e.target.value);
  };

  const handleAlert = (e) => {
    e.preventDefault();
    let pack = { id, message: selected, subCreator: userInfo.sub };
    axios.post("/alert/answer", pack).then((response) => null);
    handleClose();
  };



//Rescue URL-Image from text to download
  const [ url , setUrl ] = useState("")
  const [ nameFile, setNameFile ] = useState("")

  const handleseparar = ()=> {

    if (text.includes("(https://res.cloudinary.com")){
        
        const separado =	text.split("(https://res.cloudinary.com")
        const listo1 = "https://res.cloudinary.com"+separado[1]
        const variable = `)=250x`
        const listo2 = listo1.split(`${variable}`)
        const listo3 = listo2[0]
        console.log(listo3)
        setUrl(listo3)

        const segundo = listo3.split("/")
        const tamanhoSegundo = segundo.length-1
        const casiFinal = segundo[tamanhoSegundo]
        const anteUltimo = casiFinal.split(")")
        const ultimo = anteUltimo[0]
        console.log(ultimo)
        setNameFile(ultimo)
    } 
  }

  // Hilo de comentarios en cada respuesta
  const [toggleHilo, setToggleHilo] = useState(false);

  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (toggleHilo && !myRef.current.contains(e.target)) {
      setToggleHilo(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleToggleHilo = () => {
    setToggleHilo(!toggleHilo);
  };

  return (
    <div className={statusValidated ? style.validated : style.total}>
      <div className={style.first}>
        <div id={style.name}>
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
        <div className={style.validate}>
          <button
            className={
              userInfo.sub === subQ &&
              userInfo.sub !== subR &&
              question.statusValidated === false
                ? style.btnValidate
                : style.none
            }
            onClick={handlerChooseQuestion}
          >
            Validar respuesta
          </button>
        </div>
        <div className={statusValidated ? null : style.none}>
          <TaskAltIcon color="success" fontSize="large" />
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

        <div className={style1 === true || errors.text ? style.editFull : style.editBtn}>
          <button type="button" className={style.btnCode} onClick={handleClick}>
            {" "}
            Javascript{" "}
          </button>
          <CheckIcon
            fontSize="large"
            color="primary"
            cursor="pointer"
            className={style.confirmEdit}
            onClick={handleConfirmAnswer}
          />
        </div>
      </div>
      <div className={style.bajoTexto}>
        <div className={style.likes}>
          <span className={style.span2}>
            <ThumbUpIcon
              fontSize="medium"
              color={liked ? "primary" : "action"}
              onClick={(e) => addLike(e)}
              className={style.fav}
            />
          </span>
          <span className={style.spanLikes}>{likes}</span>
          <span className={style.span}>
            <ThumbDownIcon
              fontSize="medium"
              color={disliked ? "error" : "action"}
              onClick={(e) => removeLike(e)}
              className={style.fav}
            />
          </span>
        </div>
{/* 
        <div>
          <a className={style.descarga} onClick={(e)=>handleseparar(e)} href={url} download={nameFile} target="_blank" rel="noreferrer">
              Abrir imagen adjunta
          </a>
        </div> */}

        {/* Hilo de comentarios en cada respuesta */}
        <div ref={myRef}>
          <div onClick={handleToggleHilo} className={style.comentarios}>
            {cantSubAnswers ?  cantSubAnswers === 1 ? `${cantSubAnswers} comentario` : `${cantSubAnswers} comentarios` : "Comentar"}
          </div>

          {toggleHilo && (
              <Comentarios
                id={id}
                cantSubAnswers={cantSubAnswers}
                subAnswers={subAnswers}
                setIsModify={setIsModify}
              />
            )}
         </div>

        <div className={imgIncludes ? null : style.notIncludes}>
          <a className={style.descarga} onClick={(e)=>handleseparar(e)} href={url} download={nameFile} target="_blank" rel="noreferrer">
          <Tooltip title="Descargar imagen">
            <DownloadIcon 
              fontSize="medium"
              color='active'
            />
          </Tooltip>
          </a>
        </div>

        <div className={userInfo.sub === subR && !statusValidated ? null : style.none}>
          <Tooltip title="Editar">
            <EditIcon
              fontSize="medium"
              className={statusValidated ? style.none: style.moreBtn}
              onClick={handleEditAnswer}
            />
          </Tooltip>
        </div>
        <div
          className={userInfo.sub === subR ? null : style.none}
          id={style1 ? null : style.hidden}
        >
          <Tooltip title="Eliminar">
            <DeleteIcon
              fontSize="medium"
              className={style.deleteBtn}
              onClick={handlerCheckDelete}
            />
          </Tooltip>
        </div>
        <div className={userInfo.sub === subR ? style.none : null}>
          <span className={style.span5}>
            <Tooltip title="Reportar">
              <BlockIcon
                onClick={handleOpen}
                className={style.delete}
                fontSize="medium"
                color="action"
              />
            </Tooltip>
          </span>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={style.box}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mt: 2, marginLeft: "1vw", marginRight: "0.5vw" }}
              >
                Reportar respuesta
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  marginLeft: "1vw",
                  marginRight: "0.5vw",
                  fontStyle: "normal",
                }}
              >
                Eliga su motivo para reportar esta respuesta
              </Typography>
              <div>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    sx={{
                      fontStyle: "normal",
                      mt: 2,
                      marginLeft: "1vw",
                      marginRight: "0.5vw",
                    }}
                  >
                    Opciones:{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                    sx={{ mt: 2, marginLeft: "1vw", marginRight: "0.5vw" }}
                  >
                    <FormControlLabel
                      onChange={(e) => handleChangeAlert(e)}
                      value="inadecuado"
                      control={<Radio />}
                      label="Comportamiento inadecuado"
                    />
                    <FormControlLabel
                      onChange={(e) => handleChangeAlert(e)}
                      value="incompleto"
                      control={<Radio />}
                      label="Respuesta insignificante"
                    />
                    <FormControlLabel
                      onChange={(e) => handleChangeAlert(e)}
                      value="otro"
                      control={<Radio />}
                      label="Otro"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <button className={style.enviar} onClick={(e) => handleAlert(e)}>
                Enviar
              </button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SimpleAnswer;
