import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from "./styles/CardUserAnswer.module.css";
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const CardUserAnswer = ({id, title, text, likes, tPoints, name, picture}) => {

  const user = useSelector(state => state.user)

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <img className={style.userImage} src={user.picture} alt="imagen user" />
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>

          <div className={style.TitleAndExtrasBox}>
            <div className={style.firstRow}>
              <div className={style.userPreg}>
                <h6>{user.nickname} pregunta:</h6>
              </div>
              
              <div className={style.Extras}>
                <h6>
                  Teach Points: {tPoints}
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
            <div>
              Likes: {likes}
            </div>
            <div>
                  <Tooltip title="Editar">
                      <EditIcon fontSize="medium" className={style.moreBtn} />
                      {/* <AddIcon fontSize="large" color='disabled' className={style.moreBtn} onClick={(e) => onClickAdd(e)} /> */}
                  </Tooltip>
            </div>
            <div>
                <Tooltip title="Eliminar">
                    <DeleteIcon fontSize="medium" className={style.deleteBtn} />
                </Tooltip>
            </div>
            <div>
              <Link to={`/responder/${id}`}>
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
