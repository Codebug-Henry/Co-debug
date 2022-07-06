import React from "react";
import style from "./styles/CardQuestion.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';
import { Link } from "react-router-dom";


const CardQuestLogOut = ({
  id,
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
          <img className={style.userImage} src={picture} alt="imagen user" referrerPolicy="no-referrer"/>
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