import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import {getUserInfo, sendQuestion } from '../redux/actions/index';
import style from "./styles/FormContact.module.css";
import InfoPopper from "./InfoPopper";

const FormContact = () => {
  // const dispatch = useDispatch()
  // let user = useSelector(state=> state.user);

  // useEffect(()=> {
  //     dispatch(getUserInfo());
  // }, [dispatch])

  function validate(input) {
    let errors = {};
    if (!input.title) errors.title = "Se requiere un título";
    if (input.title && !/^[A-Za-z0-9\s]+$/.test(input.title))
      errors.title = "El título debe tener solo letras, números y espacios.";
    if (!input.email) errors.email = "Se requiere un email";
    if (
      input.email &&
      !/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(
        input.email
      )
    )
      errors.email = "El formato de email debe ser válido.";
    if (!input.text)
      errors.text = "Se requiere una consulta, sugerencia o reclamo";
    if (input.text.length > 500)
      errors.title = "La consulta debe tener un máximo de 500 caracteres";

    return errors;
  }

  const [input, setInput] = useState({
    sub: 1,
    // sub: user.sub,
    email: "",
    title: "",
    text: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    // dispatch(sendQuestion(input))
    alert("Actividad creada");
    setInput({
      email: "",
      title: "",
      text: "",
    });
    // ver donde redirigir
  }

  return (
    <div id={style.all}>
      <div id={style.title}>
        <h1>Ingresa una consulta, sugerencia o reclamo</h1>
        <InfoPopper />
      </div>
      <div id={style.contenedor}>
        <form id={style.form}>
          <div id={style.div1}>
            <p> Elige un título: </p>
            <input
              type="text"
              value={input.title}
              name="title"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.title && (
              <div className={style.error}>
                <span> {errors.title}</span>
              </div>
            )}
          </div>
          <div id={style.divEmail}>
            <p> Ingresa tu email: </p>
            <input
              type="text"
              value={input.email}
              name="email"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.email && (
              <div className={style.error}>
                <span> {errors.email}</span>
              </div>
            )}
          </div>
          <div id={style.div2}>
            <p> Ingresa tu consulta, sugerencia o reclamo: </p>
            <textarea
              type="text"
              value={input.text}
              name="text"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.text && (
              <div className={style.error}>
                <span> {errors.text}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !input.title ||
              !input.email ||
              !input.text ||
              errors.title ||
              errors.email ||
              errors.text
            }
            className={style.btn}
          >
            Crear Consulta
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
