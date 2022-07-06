import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from "./styles/CardUserAnswer.module.css";
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import { putAnswer } from '../redux/actions';

const CardUserAnswer = ({id, qid, title, text, likes, tPoints, setIsModify}) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  // const answers = useSelector(state=> state.answers);
  const [style1, setStyle1] = useState(true)
  const [newAnswer, setNewAnswer] = useState({
    id: id,
    text: text
  })

  function toRender(){
    style1 === true ? setStyle1(false) : setStyle1(true)
  }

  function handleDeleteAnswer(e){
    e.preventDefault();
    setIsModify(true)
    dispatch(putAnswer({id: id, statusDeleted: true}, setIsModify));
  }

  function handleEditAnswer(e){
      e.preventDefault();
      toRender()
  }

  const handleConfirmAnswer = (e) => {
      e.preventDefault();
      setIsModify(true)
      dispatch(putAnswer(newAnswer, setIsModify));
      toRender()
  }

  function onChangeInputText(e){
      setNewAnswer({
          ...newAnswer,
          text: e.target.value
      })
  }

  function handleClick() {
      setNewAnswer({
          ...newAnswer,
          text: newAnswer.text + "\n```javascript\n(escribe tu código javascript aquí)\n```",
      })
  }

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <img className={style.userImage} src={user.picture} alt="imagen user" referrerPolicy="no-referrer"/>
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

          <div id={style1 === true ? style.question : style.question2}>
                <div id={style1 === true ? style.divQuest : style.editFull}>
                    <ReactMarkdown
                        children={text}
                        className={style.markdown}
                        components={{ code: Highlighter }}
                    />
                </div>

                <div className= {style1 === true ? style.editFull : style.editFull2}>
                    <textarea   type='text'
                                // defaultValue={text} 
                                value={newAnswer.text} 
                                name='text' 
                                autoComplete='off'
                                className={style.editText}
                                onChange={e=> onChangeInputText(e)}
                    />
                </div>
                
                <div id={style1 === true ? style.editBtn : style.editFull}>
                    {/* <Tooltip title="Editar">
                        <Fab color='action' aria-label="edit" size="small" className={style.editBtn} id='editButton' onClick={e=> handleEditQuestion(e)}>
                            <EditIcon fontSize="small"  />
                        </Fab>
                    </Tooltip> */}
                </div>

                
                <div className= {style1 === true ? style.editFull : style.editBtn}>
                    <button type='button' className={style.btnCode} onClick={handleClick}> Javascript </button>
                    <CheckIcon  fontSize='large' 
                                color='primary' 
                                cursor='pointer'
                                className={style.confirmEdit}
                                onClick={handleConfirmAnswer}/> 
                </div>
            </div>

          <div className={style.bajoTexto}>
            <div className={style.cantLikes}>
              Likes: {likes}
            </div>
            <div>
                  <Tooltip title="Editar">
                      <EditIcon fontSize="medium" className={style.moreBtn} onClick={handleEditAnswer} />
                  </Tooltip>
            </div>
            <div>
                <Tooltip title="Eliminar">
                    <DeleteIcon fontSize="medium" className={style.deleteBtn} onClick={handleDeleteAnswer} />
                </Tooltip>
            </div>
            <div>
              <Link to={`/responder/${qid}`}>
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
