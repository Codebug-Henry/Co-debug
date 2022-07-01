import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import style from "./styles/CardQuestion.module.css";
import like from "../images/like2.png";
import dislike from "../images/dislike2.png";
import denuncia from "../images/denuncia2.png";
import favorito from "../images/favorito2.png";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CardQuestion = ({
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
  id
}) => {
  const [likeOnScreen] = useState(likes);
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user)
  //MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [selected, setSelected] = useState(null);

  const handleChangeAlert = (e)=>{
    setSelected(e.target.value)
  }
  //
  const handleAlert = (e)=>{
    e.preventDefault()
    let pack = {id, message: selected, subCreator: user.sub}
    axios.post("http://localhost:3001/alert/question", pack)
    .then(response=> null)
    handleClose()
  }

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-2 ${style.pictureBox}`}>
          <img
            className={style.userImage}
            src={picture}
            alt="imagen de usuario"
          />
        </div>
        <div className={`col-lg-8 ${style.leftBox}`}>
          <div className={style.TitleAndExtrasBox}>
            <div className={style.userPreg}>
              <h6>{nickname} pregunta:</h6>
            </div>
            <div className={style.Title}>
              <h6>{title}</h6>
            </div>
            <div className={style.Extras}>
              <h6>
                Respuestas:{cantAnswers} - T.Points:{teachPoints}
              </h6>
            </div>
          </div>
          <div className={style.questionText}>{text}</div>
          <div className={style.bajoTexto}>
            <div className={style.likes}>
              {likeOnScreen}
              <img src={like} alt="mano arriba" className={style.like} />
              <img src={dislike} alt="mano abajo" className={style.dislike} />
            </div>

            <div>
              <img src={favorito} alt="favorito" className={style.like} />
            </div>
            <div>
              <img onClick={handleOpen} src={denuncia} alt="denuncia" className={style.delete} />
                  <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                  <Box className={style.box}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Reportar pregunta
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Eliga su motivo para reportar esta pregunta
                    </Typography>
                    <div>
                          <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">Opciones: </FormLabel>
                          <RadioGroup
                             aria-labelledby="demo-radio-buttons-group-label"
                             defaultValue="inadecuado"
                              name="radio-buttons-group"
                              >
                        <FormControlLabel  onChange={(e)=>handleChangeAlert(e)} value="inadecuado" control={<Radio />} label="Comportamiento inadecuado" />
                        <FormControlLabel onChange={(e)=>handleChangeAlert(e)} value="incompleto" control={<Radio />} label="Pregunta incompleta" />
                        <FormControlLabel onChange={(e)=>handleChangeAlert(e)} value="otro" control={<Radio />} label="Otro" />
                                 </RadioGroup>
                           </FormControl>
                    </div>
                      <button onClick={(e)=>handleAlert(e)}>Enviar</button>
                  </Box>
                </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-2 ${style.rightBox}`}>
        <Link to={`/responder/${id}`}>
          <button className={style.answerIt}>Responder</button>
        </Link>
      </div>
    </div>
  );
};

export default CardQuestion;
