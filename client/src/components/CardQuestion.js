import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./styles/CardQuestion.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BlockIcon from "@mui/icons-material/Block";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { addFavourites, modifyQuestion } from "../redux/actions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { Checkbox } from "@mui/material";
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Highlighter from "./Highlighter";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const CardQuestion = ({
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
  id,
  setIsFavorite,
  statusValidated
}) => {

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const liked = userInfo.questLiked?.includes(id)
  const disliked = userInfo.questDisliked?.includes(id)

  const [flag, setFlag] = useState(true);

  function handleAddFavourite(e) {
    e.preventDefault();
    addFavourites(userInfo.sub, id, true, setIsFavorite);
  }

  function handleRemoveFavourite(e) {
    e.preventDefault();
    addFavourites(userInfo.sub, id, false, setIsFavorite);
  }

  async function addLike(e) {
    e.preventDefault();
    if (!liked && flag) {
      setFlag(false)
      dispatch(modifyQuestion({ id: id, like: "add", sub: userInfo.sub }, null, setIsFavorite, setFlag));
    }
  }

  async function removeLike(e) {
    e.preventDefault();
    if (!disliked && flag) {
      setFlag(false)
      dispatch(modifyQuestion({ id: id, like: "remove", sub: userInfo.sub }, null, setIsFavorite, setFlag));
    }
  }

  //MODAL
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleChangeAlert = (e) => {
    setSelected(e.target.value);
  };
  //
  const handleAlert = (e) => {
    e.preventDefault();
    let pack = { id, message: selected, subCreator: userInfo.sub };
    axios
      .post("/alert/question", pack)
      .then((response) => null);
    handleClose();
  };

  return (
    <div className={statusValidated ?
                    `container-fluid ${style.validated}`:
                     `container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <img className={style.userImage} src={picture} alt="imagen user" referrerPolicy="no-referrer"/>
          <div className={statusValidated ? style.success : style.none}>
            <TaskAltIcon color='success' fontSize='large' />
          </div>
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>

          <div className={style.TitleAndExtrasBox}>
            <div className={style.firstRow}>
              <div className={style.userPreg}>
                <span>{nickname} pregunta:</span>
              </div>
              
              <div className={style.Extras}>
                <Link to={`/responder/${id}`} className={style.botonResp}>
                  <span>
                    {cantAnswers} respuestas
                  </span>
                </Link> 
                  <span>
                    - T. Points: {teachPoints}
                  </span>  
              </div>
            </div>
            <div className={style.Title}>
              <span>{title}</span>
            </div>
          </div>

          {/* <div className={style.questionText}>{text}</div> */}
          <div className={style.questionText}>
            <ReactMarkdown children={text} components={{ code: Highlighter }} />
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
                <span className={style.toolTip2}>Like</span>
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
                <span className={style.toolTip}>Dislike</span>
              </span>
            </div>

            <div>
              {userInfo.favourites?.includes(id) ? 
              <span className={style.span3}>
                <FavoriteIcon
                  fontSize="medium"
                  color="error"
                  id="favorite"
                  className={style.fav}
                  onClick={(e) => handleRemoveFavourite(e)}
                />
                <span className={style.toolTip3}>Quitar Favoritos</span>
              </span>
                : 
              <span className={style.span4}>
                <FavoriteIcon
                fontSize="medium"
                color="action"
                className={style.fav}
                onClick={(e) => handleAddFavourite(e)}
                />
                <span className={style.toolTip4}>Agregar Favoritos</span>
              </span>
            }
            
            </div>
            <div>
              <span className={style.span5}>
                <BlockIcon
                  onClick={handleOpen}
                  className={style.delete}
                  fontSize="medium"
                  color="action"
                />
                <span className={style.toolTip5}>Denunciar</span>
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
                    Reportar pregunta
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: '1vw', marginRight: '0.5vw', fontStyle: 'normal' }}>
                    Eliga su motivo para reportar esta pregunta
                  </Typography>
                  <div>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"
                                  sx={{ fontStyle: 'normal', mt: 2, marginLeft: '1vw', marginRight: '0.5vw' }}>
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
                          label="Pregunta incompleta"
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
            <div>
              <Link to={`/responder/${id}`}>
                <button className={style.answerIt}>Responder</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-0 ${style.rightBox}`}></div>
    </div>
  );
};

export default CardQuestion;
