import React from "react";
import style from "./styles/CardQuestion.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';


const CardQuestLogOut = ({
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
}) => {

  const { loginWithRedirect } = useAuth0();

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <img
            className={style.userImage}
            src={picture}
            alt="imagen user"
            referrerpolicy="no-referrer"
          />
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>
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
          <div className={style.questionText}>
            <ReactMarkdown
              children={text}
              components={{ code: Highlighter }}
            />
          </div>
          <div className={style.bajoTexto}>
            <div className={style.likes}>
              <ThumbUpIcon fontSize='medium' color="primary" onClick={() => loginWithRedirect()} className={style.fav}/>
              {likes}
              <ThumbDownIcon fontSize='medium' color="error" onClick={() => loginWithRedirect()} className={style.fav} />
            </div>

            <div>
              {/* <img src={favorito} alt="favorito" className={style.like} /> */}
                <FavoriteIcon fontSize="medium" 
                              color='error'
                              id='favorite'

                              className={style.fav}
                              onClick={() => loginWithRedirect()} />                

            </div>
            <div>
              <BlockIcon onClick={() => loginWithRedirect()} className={style.delete} fontSize="medium" />
            </div>
            <div>
                <button className={style.answerIt} onClick={() => loginWithRedirect()} >Responder</button>
             </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-0 ${style.rightBox}`}>
       
      </div>
    </div>
  );
};

export default CardQuestLogOut;