import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/CardQuestion.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BlockIcon from "@mui/icons-material/Block";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  addFavourites,
  getAllQuestions,
  modifyQuestion,
} from "../redux/actions";
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

const CardQuestion = ({
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
  id,
  sort,
  page,
  setIsFavorite
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
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
    await dispatch(modifyQuestion({ id: id, like: "add", sub: userInfo.sub }));
    dispatch(getAllQuestions(sort, page));
  }

  async function removeLike(e) {
    e.preventDefault();
    await dispatch(
      modifyQuestion({ id: id, like: "remove", sub: userInfo.sub })
    );
    dispatch(getAllQuestions("desc", page));
  }

  //MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);

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
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <img className={style.userImage} src={picture} alt="imagen user" />
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>

          <div className={style.TitleAndExtrasBox}>
            <div className={style.firstRow}>
              <div className={style.userPreg}>
                <h6>{nickname} pregunta:</h6>
              </div>
              
              <div className={style.Extras}>
                <h6>
                  Respuestas: {cantAnswers} - T. Points: {teachPoints}
                </h6>
              </div>
            </div>
            <div className={style.Title}>
              <h6>{title}</h6>
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
                  color="primary"
                  onClick={(e) => addLike(e)}
                  className={style.fav}
                />
                <span className={style.toolTip2}>Like</span>
              </span>
              <span className={style.spanLikes}>
                {likes}
              </span>
              {/* <img src={like} alt="mano arriba" className={style.like} />
              <img src={dislike} alt="mano abajo" className={style.dislike} /> */}
              <span className={style.span}>
                <ThumbDownIcon
                  fontSize="medium"
                  color="error"
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
                color="string"
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
                  >
                    Reportar pregunta
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Eliga su motivo para reportar esta pregunta
                  </Typography>
                  <div>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Opciones:{" "}
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
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
                  <button onClick={(e) => handleAlert(e)}>Enviar</button>
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
