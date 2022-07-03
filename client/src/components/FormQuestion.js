import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllTags, getUserInfo, sendQuestion } from '../redux/actions/index';
import style from './styles/FormQuestion.module.css';
import InfoPopper from './InfoPopper';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReactMarkdown from 'react-markdown';
import Highlighter from './Highlighter';

const FormQuestion = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state=> state.user);
    const tags = useSelector(state=> state.tags); 

    useEffect(()=> {
        dispatch(getUserInfo(userInfo.sub));
        dispatch(getAllTags())
    }, [dispatch, userInfo.sub])

    const navigate = useNavigate()

    function validate(input){
        let errors = {}
        if(!input.title) errors.title = 'Se requiere un título'
        if(input.title.length > 25) errors.title = 'Título debe tener un máximo de 25 caracteres'
        if(input.title && !/^[A-Za-z0-9\s]+$/.test(input.title)) errors.title = 'El título debe tener solo letras, números y espacios.'
        if(!input.text) errors.text = 'Se requiere una pregunta'
        if(input.text.length > 500) errors.title = 'La pregunta debe tener un máximo de 500 caracteres'
        if(input.macroTag.length === 0) errors.macroTag = 'Selecciona al menos un macroTag'
        if(input.macroTag.length && input.macroTag.length > 3) errors.macroTag = 'Selecciona como máximo 3 macroTag'
        if(input.microTag.length === 0) errors.microTag = 'Selecciona al menos un microTag'
        if(input.microTag.length && input.microTag.length > 3) errors.microTag = 'Selecciona como máximo 3 microTag'
  
       return errors
    }
    let sub = userInfo.sub

    const [input, setInput] = useState({
        title: localStorage.titleQuestion || '',
        text: localStorage.textQuestion || '',
        macroTag: localStorage.macroTagQuestion ? JSON.parse(localStorage.macroTagQuestion) : [],
        microTag: localStorage.microTagQuestion ? JSON.parse(localStorage.microTagQuestion) : []
    })
    
    const [errors, setErrors] = useState({})

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        const property = e.target.name + "Question"
        localStorage[property] = e.target.value;
    }

    function handleSelectMicroTag(e){
        if (!input.microTag.includes(e.target.value)) {
        setInput({
            ...input,
            microTag: [...input.microTag, e.target.value]
        })
        setErrors(validate({
            ...input,
            microTag: [...input.microTag, e.target.value]
        }))
        localStorage.microTagQuestion = JSON.stringify([...input.microTag, e.target.value]);
        }   
        else{
            alert('Ese Tag ya fue elegido')
        }
    }

    function handleSelectMacroTag(e){
        if (!input.macroTag.includes(e.target.value)) {
        setInput({
            ...input,
            macroTag: [...input.macroTag, e.target.value]
        })
        setErrors(validate({
            ...input,
            macroTag:  [...input.macroTag, e.target.value]
        }))
        localStorage.macroTagQuestion = JSON.stringify([...input.macroTag, e.target.value]);
        }   
        else{
            alert('Ese Tag ya fue elegido')
        }
    }
 
    function handleDeleteMicroTag(e){
        const filteredMicroTags = input.microTag.filter(m=> m !== e)
        setInput({
            ...input,
            microTag: filteredMicroTags
        })
        setErrors(validate({
            ...input,
            microTag: filteredMicroTags
        }))
        localStorage.microTagQuestion = JSON.stringify(filteredMicroTags);
    }

    function handleDeleteMacroTag(e){
        const filteredMacroTags = input.macroTag.filter(m=> m !== e)
        setInput({
            ...input,
            macroTag: filteredMacroTags
        })
        setErrors(validate({
            ...input,
            macroTag: filteredMacroTags
        }))
        localStorage.macroTagQuestion = JSON.stringify(filteredMacroTags);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(sendQuestion({
            sub,
            title: input.title,
            text: input.text,
            macroTags: input.macroTag,
            microTags: input.microTag,
            imgs: []
        }));
        alert('Pregunta creada');
        setInput({
            title: '',
            text: '',
            macroTag: [],
            microTag: []
        })
        localStorage.removeItem("titleQuestion");
        localStorage.removeItem("textQuestion");
        localStorage.removeItem("microTagQuestion");
        localStorage.removeItem("macroTagQuestion");
        navigate('/mispreguntas')
    }

    function handleClick() {
        setInput({
            ...input,
            text: input.text + "\n```javascript\n(escribe tu código javascript aquí)\n```",
        })
    }

    return (
        <div id={style.all}>
            <div id={style.title}>
                <h1>Ingresa una pregunta</h1>
                <InfoPopper/>
            </div>
            <div id={style.contenedor}>
                <form id={style.form}>
                    <div id={style.div1}>
                        <p> Elige un título: </p>
                            <input  type='text'
                                    value={input.title} 
                                    name='title' 
                                    autoComplete='off'
                                    onChange={handleChange}
                            />
                        {   
                            errors.title && (
                                <div className={style.error}>
                                    <span> {errors.title}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className={style.view} >
                        <div className={style.div2}>
                            <div className={style.pregBtn}>
                                <p> Ingresa tu pregunta: </p>
                                <button type='button' className={style.btnCode} onClick={handleClick}> Código Javascript </button>
                            </div>
                            
                            <textarea  type='text'
                                    value={input.text} 
                                    name='text' 
                                    autoComplete='off'
                                    onChange={handleChange}
                            />
                            {   
                                errors.text && (
                                    <div className={style.error}>
                                        <span> {errors.text}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className={style.div2}>
                            <p> Vista previa: </p>
                            <ReactMarkdown 
                                children={input.text}
                                className={style.markdown}
                                components={{code: Highlighter}}
                            />
                        </div>
                    </div>
                    <div id={style.div3}>
                        <div className={style.macroTag1}>
                            <div>
                                <label> MacroTags: </label>
                                {/* <select value={input.macroTag} className={style.select} onChange={handleSelectMacroTag} >
                                    <option hidden value='' selected>Selecciona</option> */}
                                <select defaultValue='' className={style.select} onChange={handleSelectMacroTag} >
                                    <option hidden value='' >Selecciona</option>
                                    {
                                        tags && tags.map(tag=>(
                                            <option value={tag.tag} key={tag.id}> {tag.tag} </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={style.selected1}>
                                <div className={style.selected}>
                                    <span>Macrotags seleccionados: {input.macroTag.length}</span>
                                </div>
                                <div className={style.list}>
                                    {input.macroTag.map(macro=>
                                        <div key={macro}>
                                            <span>
                                                {macro}
                                            </span>
                                            <button type='button' className={style.btnDelete} onClick={()=>handleDeleteMacroTag(macro)}>
                                                X
                                            </button>
                                        </div>
                                    )}
                                </div>     
                            </div>   
                        </div>
                        {   
                            errors.macroTag && (
                                <div className={style.error}>
                                    <span> {errors.macroTag}</span>
                                </div>
                            )
                        }
                    </div>
                    <div id={style.div3}>
                        <div className={style.macroTag1}>
                            <div>
                                <label> MicroTags: </label>
                                <select defaultValue='' className={style.select} onChange={handleSelectMicroTag} >
                                    <option hidden value=''>Selecciona</option>
                                    {
                                        input.macroTag.length && tags.filter(t=> input.macroTag.includes(t.tag)).map(e=>e.microTags.map(micro=>(
                                            <option value={micro.tag} key={micro.id}> {micro.tag} </option>  
                                            )))
                                    }   
                                </select>
                            </div>
                            <div className={style.selected1}>
                                <div className={style.selected}>
                                    <span>Microtags seleccionados: {input.microTag.length}</span>
                                </div>
                                <div className={style.list}>
                                    {input.microTag.map(micro=>
                                        <div key={micro}>
                                            <span>
                                                {micro}
                                            </span>
                                            <button type='button' className={style.btnDelete} onClick={()=>handleDeleteMicroTag(micro)}>
                                                {/* <img src={deleteIcon} alt="X" width='15px' height='15px' /> */}
                                                X
                                            </button>
                                        </div>
                                    )}
                                </div>     
                            </div>   
                        </div>
                        {   
                            errors.microTag && (
                                <div className={style.error}>
                                    <span> {errors.microTag}</span>
                                </div>
                            )
                        }
                    </div>
                         
                    <button type='submit' 
                            onClick={e=> handleSubmit(e)}
                            disabled={!input.title || !input.text || input.macroTag.length === 0 || input.microTag.length > 3 ||
                                        input.macroTag.length > 3 || input.microTag.length === 0 ||
                                        errors.title || errors.text || errors.macroTag || errors.microTag 
                            }
                            className={style.btn}
                    >
                            Enviar Pregunta
                    </button>     
                </form>
            </div>
        </div>

    )
}

export default FormQuestion