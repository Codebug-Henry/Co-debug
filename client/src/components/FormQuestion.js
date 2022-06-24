import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUserInfo, sendQuestion } from '../redux/actions/index';
import style from './styles/FormQuestion.module.css';
import InfoPopper from './InfoPopper';
import { useNavigate } from 'react-router-dom';


const FormQuestion = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state=> state.user);
    // let microTags = useSelector(state.microTags); si se crea un modelo con los microtags
    // let macroTags = useSelector(state.macroTags); si se crea un modelo con los macrotags

    useEffect(()=> {
        dispatch(getUserInfo(userInfo.sub));
    }, [dispatch])

    const navigate = useNavigate()

    function validate(input){
        let errors = {}
        if(!input.title) errors.title = 'Se requiere un título'
        if(input.title.length > 25) errors.title = 'Título debe tener un máximo de 25 caracteres'
        if(input.title && !/^[A-Za-z0-9\s]+$/.test(input.title)) errors.title = 'El título debe tener solo letras, números y espacios.'
        if(!input.text) errors.text = 'Se requiere una pregunta'
        if(input.text.length > 500) errors.title = 'La pregunta debe tener un máximo de 500 caracteres'
        // if(input.microTag.length === 0) errors.microTag = 'Selecciona al menos un microTag'
        // if(input.microTag.length > 5) errors.microTag = 'Selecciona como máximo 5 microTag'
        // if(input.macroTag.length === 0) errors.macroTag = 'Selecciona al menos un macroTag'
        // if(input.macroTag.length > 5) errors.macroTag = 'Selecciona como máximo 5 macroTag'
        
       return errors
    }
    let sub = userInfo.sub

    const [input, setInput] = useState({
        title: '',
        text: ''
        // microTag: [],
        // macroTag: []
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
    }

    // function handleSelectMicroTag(e){
    //     if (!input.microTag.includes(e.target.value)) {
    //     setInput({
    //         ...input,
    //         microTag: [...input.microTag, e.target.value]
    //     })
    //     setErrors(validate({
    //         ...input,
    //         microTag: e.target.value
    //     }))
    //     }   
    //     else{
    //         alert('Ese Tag ya fue elegido')
    //     }
    // }

    // function handleSelectMacroTag(e){
    //     if (!input.macroTag.includes(e.target.value)) {
    //     setInput({
    //         ...input,
    //         macroTag: [...input.macroTag, e.target.value]
    //     })
    //     setErrors(validate({
    //         ...input,
    //         macroTag: e.target.value
    //     }))
    //     }   
    //     else{
    //         alert('Ese Tag ya fue elegido')
    //     }
    // }

    // function handleDeleteMicroTag(el){
    //     setInput({
    //         ...input,
    //         microTag: input.microTag.filter(m=> m !== el)
    //     })
    // }

    // function handleDeleteMacroTag(el){
    //     setInput({
    //         ...input,
    //         macroTag: input.macroTag.filter(m=> m !== el)
    //     })
    // }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(sendQuestion({
            sub,
            title: input.title,
            text: input.text
        }));
        alert('Pregunta creada');
        setInput({
            title: '',
            text: ''
            // microTag: [],
            // macroTag: []
        })
        navigate('/mispreguntas')
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
                    <div id={style.div2}>
                        <p> Ingresa tu pregunta: </p>
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
                    {/* <div id={style.div3}>
                        <label> MacroTags: </label>
                            <select value={input.macroTag} onChange={handleSelectMacroTag} >
                                <option value="">Selecciona</option>
                                {
                                    macroTags && macroTags.map(macro=>(
                                        <option value={macro.name} key={macro.id}> {macro.name} </option>
                                    ))
                                }
                                ver como se va a llamar la prop del tag en modelo
                        </select>
                        {   
                            errors.macroTag && (
                                <div className={style.error}>
                                    <span> {errors.macroTag}</span>
                                </div>
                            )
                        }
                        <div>
                            <div className={style.selected}>
                                <p>Macrotags seleccionados: {input.macroTag.length}</p>
                            </div>
                            <div>
                                {input.macroTag.map(macro=>
                                        <div key={macro}>
                                            <span>
                                                {macro}
                                            </span>
                                            <button onClick={el=>handleDeleteMacroTag(el)}>
                                                 X
                                            </button>
                                        </div>
                                    )
                                }
                            </div>        
                        </div>
                    </div>
                    <div id={style.div4}>
                        <label> MicroTags: </label>
                            <select value={input.microTag} onChange={handleSelectMicroTag} >
                                <option value="">Selecciona</option>
                                 {
                                    microTags && microTags.map(micro=>(
                                        <option value={micro.name} key={micro.id}> {micro.name} </option>  
                                    ))
                                    }   
                                ver como se va a llamar la prop del tag en modelo
                        </select>
                        {   
                            errors.microTag && (
                                <div className={style.error}>
                                    <span> {errors.microTag}</span>
                                </div>
                            )
                        }
                        <div>
                            <div className={style.selected}>
                                <p>Microtags seleccionados: {input.microTag.length}</p>
                            </div>
                            <div>
                                {input.microTag.map(micro=>
                                        <div key={micro}>
                                            <span>
                                                {micro}
                                            </span>
                                            <button onClick={(el)=>handleDeleteMicroTag(el)}>
                                                 X
                                            </button>
                                        </div>
                                    )
                                }
                            </div>        
                        </div>
                    </div> */}
                         
                    <button type='submit' 
                            onClick={e=> handleSubmit(e)}
                            disabled={!input.title || !input.text || 
                                    // input.microTag.length === 0 || input.macroTag.length === 0 || input.microTag.length > 5 || input.macroTag.length > 5 ||
                                    errors.title || errors.text  
                                    // || errors.microTag || errors.macroTag 
                            }
                            className={style.btn}
                    >
                            Crear Pregunta
                    </button>     
                </form>
            </div>
        </div>

    )
}

export default FormQuestion