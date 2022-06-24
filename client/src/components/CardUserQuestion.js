import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import style from "./styles/CardUserQuestion.module.css"
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { deleteQuestion, getUserQuestions, modifyQuestion } from '../redux/actions';


const CardUserQuestion = ({id, title, text, likes, cantAnswers, name, picture, setCant, sub}) => {

    const dispatch = useDispatch();
    const questions = useSelector(state=> state.questions);
    const [style1, setStyle1] = useState(true)

    const [newQuestion, setnewQuestion] = useState({
        id: id,
        title: title,
        text: text
    })

    useEffect(()=>{
        dispatch(getUserQuestions(sub))
      }, [])

    function toRender(){
        style1 === true ? setStyle1(false) : setStyle1(true)
    }

    async function handleDeleteQuestion(e){
        e.preventDefault();
        await dispatch(deleteQuestion(id));
        setCant(questions.length) 
    }

    function handleEditQuestion(e){
        e.preventDefault();
        toRender()
    }

    async function handleConfirmQuestion(e){
        e.preventDefault();
        await dispatch(modifyQuestion(newQuestion));
        dispatch(getUserQuestions(sub))
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

  return (
    <div id={style.questionCard}>
        <div id={style.left}>
            <div id={style.first}>
                <div id={style.name}>
                    <div id={style.photo}>
                    <QuestionAnswerIcon fontSize="small"/> 
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
                    <Fab color="primary" aria-label="edit" size="small" className={style.editBtn}>
                        <EditIcon onClick={e=> handleEditQuestion(e)} />
                    </Fab>
                </div>

                <div className= {style1 === true ? style.editFull : style.editFull2}>
                    <TextField  fullWidth 
                                label="Edita la pregunta" 
                                id="fullWidth" 
                                defaultValue={text} 
                                multiline='true' 
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
            <p>Respuestas: {cantAnswers}</p>
            <p>Likes: {likes}</p>
            <Fab color="primary" aria-label="edit" size="small" className={style.deleteBtn}>
                <DeleteIcon onClick={e=> handleDeleteQuestion(e)}/>
            </Fab>
        </div>
    </div>
  )
}

export default CardUserQuestion