import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import style from "./styles/CardUserQuestion.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import { deleteQuestion, modifyQuestion } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';

const CardUserQuestion = ({id, title, text, likes, cantAnswers, name, picture, setCantFirstLast, setIsModify}) => {

    const dispatch = useDispatch();
    const questions = useSelector(state=> state.userQuestions);
    const [style1, setStyle1] = useState(true)
    const navigate = useNavigate()

    const [newQuestion, setnewQuestion] = useState({
        id: id,
        title: title,
        text: text
    })

    function toRender(){
        style1 === true ? setStyle1(false) : setStyle1(true)
    }

    function handleDeleteQuestion(e){
        e.preventDefault();
        setIsModify(true)
        dispatch(deleteQuestion({id: id, statusDeleted: true}, setIsModify));
        setCantFirstLast([questions.length, questions[1], questions[4]])
    }

    function handleEditQuestion(e){
        e.preventDefault();
        toRender()
    }

    const handleConfirmQuestion = (e) => {
        e.preventDefault();
        setIsModify(true)
        dispatch(modifyQuestion(newQuestion, setIsModify));
        toRender()
    }

    function onChangeInputTitle(e){
        setnewQuestion({
            ...newQuestion,
            title: e.target.value
        })
    }

    function onChangeInputText(e){
        setnewQuestion({
            ...newQuestion,
            text: e.target.value
        })
    }

    function onClickAdd (e){
        navigate(`/responder/${id}`)
    }

    function handleClick() {
        setnewQuestion({
            ...newQuestion,
            text: newQuestion.text + "\n```javascript\n(escribe tu código javascript aquí)\n```",
        })
    }

  return (
    <div id={style.questionCard}>
        <div id={style.left}>
            <div id={style.first}>
                <div id={style.name}>
                    <div id={style.photo}>
                        <Avatar alt={name} src={picture} id={style.avatar} referrerpolicy="no-referrer"/>
                    </div>
                    <div id={style.user}> 
                        <span>{name}</span>
                    </div>
                </div>
                <div id={style1 === true ? style.theme : style.editFull}> 
                    <span>{title}</span> 
                </div>
                <div className= {style1 === true ? style.editFull : style.editTitle}>
                    <TextField  id="standard-basic" 
                                label="Edita el título" 
                                variant="standard" 
                                defaultValue={title} 
                                onChange={e=> onChangeInputTitle(e)} />
                    <div className={style.btnJS}>
                        <button type='button' className={style.btnCode} onClick={handleClick}> Código Javascript </button>
                    </div>
                </div>
            </div>
            <div id={style1 === true ? style.question : style.question2}>
                <div id={style1 === true ? style.divQuest : style.editFull}>
                    {/* <p> {text} </p> */}
                    <ReactMarkdown
                        children={text}
                        className={style.markdown}
                        components={{ code: Highlighter }}
                    />
                </div>

                <div className= {style1 === true ? style.editFull : style.editFull2}>
                    <textarea   type='text'
                                // defaultValue={text} 
                                value={newQuestion.text} 
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
                    <CheckIcon  fontSize='large' 
                                color='primary' 
                                cursor='pointer'
                                className={style.confirmEdit}
                                onClick={handleConfirmQuestion}/> 
                </div>
            </div>
            
            <div id={style.tags}>
                <span> #for </span>
                <span> #while </span>
                <span> #Javascript </span>
            </div>
        </div>
        <div id={style.right}>
            <div>
                <span>Likes: {likes}</span>
            </div>
            <div> 
                <Tooltip title="Click para ver">
                    <span onClick={(e) => onClickAdd(e)} className={style.resp} > Ver {cantAnswers} respuestas </span>
                </Tooltip>
            </div>
            <div className={style.btns}>
                <div>
                    <Tooltip title="Editar">
                        <EditIcon fontSize="medium" className={style.moreBtn} onClick={e=> handleEditQuestion(e)}/>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Eliminar">
                        <DeleteIcon fontSize="medium" className={style.deleteBtn} onClick={e=> handleDeleteQuestion(e)}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardUserQuestion