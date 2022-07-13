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
import TaskAltIcon from '@mui/icons-material/TaskAlt';


const CardQuestLogOut = ({
  id,
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
  statusValidated,
  macroTags,
  microTags
}) => {

  const { loginWithRedirect } = useAuth0();

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

          <div className={style.questionText}>
            <ReactMarkdown
              children={text}
              components={{ code: Highlighter }}
            />
          </div>

          {/* Tags */}
          <div id={style.tags}>
            {
              macroTags?.map((macro) => (
                <span key={macro.tag} className={style.tag}>{" "}#{macro.tag}{" "}</span>
              ))
            }
            {
              microTags?.map((micro) => (
                <span key={micro.tag} className={style.tag}>{" "}#{micro.tag}{" "}</span>
              ))
            }
          </div>

          <div className={style.bajoTexto}>
            <div className={style.likes}>
              <ThumbUpIcon fontSize='medium' color="action" onClick={() => loginWithRedirect()} className={style.fav}/>
              {likes}
              <ThumbDownIcon fontSize='medium' color="action" onClick={() => loginWithRedirect()} className={style.fav} />
            </div>

            <div>
              {/* <img src={favorito} alt="favorito" className={style.like} /> */}
                <FavoriteIcon fontSize="medium" 
                              color='action'
                              id='favorite'

                              className={style.fav}
                              onClick={() => loginWithRedirect()} />                

            </div>
            <div>
              <BlockIcon onClick={() => loginWithRedirect()} className={style.delete} fontSize="medium" color='action'/>
            </div>
            <div>
              <Link to={`/responder/${id}`}>
                <button className={style.answerIt}>Responder</button>
              </Link>
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