import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import style from "./styles/CardUserQuestion.module.css"
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import { deleteQuestion, getUserQuestions, modifyQuestion,getUserQuestionsOrderer } from '../redux/actions';
import { useNavigate } from 'react-router-dom';


const CardUserQuestion = ({id, title, text, likes, cantAnswers, name, picture, sub, page, setCantFirstLast}) => {

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
        // document.getElementById("selectAnswered").getElementsByTagName('option')[0] = 'selected'
        dispatch(deleteQuestion({id: id, statusDeleted: true}));
        setCantFirstLast([questions.length, questions[1], questions[4]])
    }

    function handleEditQuestion(e){
        e.preventDefault();
        toRender()
    }

    async function handleConfirmQuestion(e){
        e.preventDefault();
        await dispatch(modifyQuestion(newQuestion));
        if(document.getElementById("selectAnswered").value === 'false'){
            dispatch(getUserQuestionsOrderer(sub, 'false', page));
          }
        if(document.getElementById("selectAnswered").value === 'true'){
        dispatch(getUserQuestionsOrderer(sub, 'true', page));
        }
        if(document.getElementById("selectAnswered").value === 'All'){
          dispatch(getUserQuestions(sub, page, ''))
        }
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

  return (
    <div id={style.questionCard}>
        <div id={style.left}>
            <div id={style.first}>
                <div id={style.name}>
                    <div id={style.photo}>
                        <Avatar alt={name} src={picture} id={style.avatar} />
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
                </div>
            </div>
            <div id={style1 === true ? style.question : style.question2}>
                <div id={style1 === true ? style.divQuest : style.editFull}>
                    <p> {text} </p>
                </div>
                
                <div id={style1 === true ? style.editBtn : style.editFull}>
                    <Tooltip title="Editar">
                        <Fab color='action' aria-label="edit" size="small" className={style.editBtn} id='editButton' onClick={e=> handleEditQuestion(e)}>
                            <EditIcon fontSize="small"  />
                        </Fab>
                    </Tooltip>
                </div>

                <div className= {style1 === true ? style.editFull : style.editFull2}>
                    <TextField  fullWidth 
                                label="Edita la pregunta" 
                                id="fullWidth" 
                                defaultValue={text} 
                                multiline={true}
                                onChange={e=> onChangeInputText(e)}/> 
                </div>
                <div className= {style1 === true ? style.editFull : style.editBtn}>
                    <CheckIcon  fontSize='large' 
                                color='primary' 
                                cursor='pointer'
                                onClick={e=> handleConfirmQuestion(e)}/> 
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
                <span>Respuestas: {cantAnswers}</span>
            </div>
            <div>
                <span>Likes: {likes}</span>
            </div>
            <div className={style.btns}>
                <div>
                    <Tooltip title="Ver respuestas">
                        <AddIcon fontSize="large" color='disabled' className={style.moreBtn} onClick={(e) => onClickAdd(e)} />
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Eliminar">
                        <DeleteIcon fontSize="large" color='disabled' className={style.deleteBtn} onClick={e=> handleDeleteQuestion(e)}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardUserQuestion