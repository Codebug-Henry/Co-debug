import React, { useState } from 'react'
import style from "./styles/SimpleAnswer.module.css"
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";
import { putAnswer } from '../redux/actions';
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
import { Avatar } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const SimpleAnswer = ({id, text, likes, name, picture, subQ, subR, statusValidated, setIsModify}) => {

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const question = useSelector(state=> state.question)
  const liked = userInfo.ansLiked?.includes(id);
  const disliked = userInfo.ansDisliked?.includes(id);

  function addLike(e) {
    e.preventDefault();
    if (!liked) {
      dispatch(putAnswer({id: id, like: "add", sub: userInfo.sub }, setIsModify));
    }
  }

  function removeLike(e) {
    e.preventDefault();
    if (!disliked) {
      dispatch(putAnswer({id: id, like: "remove", sub: userInfo.sub }, setIsModify));
    }
  }

  function validateAnswer () {
    dispatch(putAnswer({id: id, statusValidated: true, sub: userInfo.sub }, setIsModify))
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
    axios
      .post("/alert/question", pack)
      .then((response) => null);
    handleClose();
  };

  return (
    <div className={statusValidated ? style.validated : style.total}>
        <div className={style.first}>
          <div id={style.name}>
            <div id={style.photo}>
              <Avatar alt={name} src={picture} id={style.avatar} referrerPolicy="no-referrer"/>
            </div>
            <div id={style.user}> 
              <span>{name}</span>
            </div>
          </div>
          <div className={style.validate}>
            <button className={userInfo.sub === subQ && userInfo.sub !== subR && question.statusValidated === false ? style.btnValidate: style.none}
                    onClick={validateAnswer}
            > 
              Validar respuesta 
            </button>
          </div>
          <div className={statusValidated ? null : style.none}>
            <TaskAltIcon color='success' fontSize='large' />
          </div>
        </div>
        <div className={style.answerText}>
                {/* Respuesta: {text} */}
                <span>Respuesta:</span>
                <ReactMarkdown
                  children={text}
                  className={style.markdown}
                  components={{ code: Highlighter }}
                />
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
              <span className={style.spanLikes}>
                {likes}
              </span>
              <span className={style.span}>
                <ThumbDownIcon
                  fontSize="medium"
                  color={disliked ? "error" : "action"}
                  onClick={(e) => removeLike(e)}
                  className={style.fav}
                />
              </span>
            </div>
            <div>
              <span className={style.span5}>
                <BlockIcon
                  onClick={handleOpen}
                  className={style.delete}
                  fontSize="medium"
                  color="action"
                />
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
                    sx={{ mt: 2, marginLeft: '1vw', marginRight: '0.5vw' }}
                  >
                    Reportar respuesta
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: '1vw', marginRight: '0.5vw' }}>
                    Eliga su motivo para reportar esta respuesta
                  </Typography>
                  <div>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"
                                 sx={{ fontStyle: 'normal', mt: 2, marginLeft: '1vw', marginRight: '0.5vw' }}
                      >
                        Opciones:{" "}
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        sx={{ mt: 2, marginLeft: '1vw', marginRight: '0.5vw' }}
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
                  <button className={style.enviar} onClick={(e) => handleAlert(e)}>Enviar</button>
                </Box>
              </Modal>
            </div>
        </div>
    </div>
  )
}

export default SimpleAnswer