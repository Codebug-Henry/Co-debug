// COMMIT NUMERO 400!!!!!!!!!!!!!

import React, { useState, useEffect } from 'react';
import { postMessage } from '../redux/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import style from './styles/FormContact.module.css';
import MensajeAlerta from './MensajeAlerta';

const FormContact = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    email: localStorage.emailContact || '',
    title: localStorage.titleContact || '',
    text: localStorage.textContact || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (input.email || input.title || input.text) {
      setErrors(
        validate({
          title: input.title,
          text: input.text,
          email: input.email,
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  function validate(input) {
    let errors = {};
    if (!input.title) errors.title = 'Se requiere un título';
    if (input.title.length > 30) errors.title = 'Máximo 30 caracteres';
    if (!input.email) errors.email = 'Se requiere un email';
    if (input.email.length > 50) errors.email = 'Máximo 50 caracteres';
    if (
      input.email &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        input.email
      )
    )
      errors.email = 'El formato de email debe ser válido.';
    if (!input.text)
      errors.text = 'Se requiere una consulta, sugerencia o reclamo';
    if (input.text.length > 2000)
      errors.title = 'La consulta debe tener un máximo de 2000 caracteres';

    return errors;
  }

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
    const property = e.target.name + 'Contact';
    localStorage[property] = e.target.value;
  }

  const textAlerta = 'Mensaje enviado';

  function handleSubmit(e) {
    e.preventDefault();
    let message = {
      sub: user.sub,
      email: input.email,
      title: input.title,
      text: input.text,
    };
    dispatch(postMessage(message));
    MensajeAlerta({ textAlerta });
    setInput({
      email: '',
      title: '',
      text: '',
    });
    localStorage.removeItem('emailContact');
    localStorage.removeItem('titleContact');
    localStorage.removeItem('textContact');
  }

  return (
    <div id={style.all}>
      <div id={style.contenedor}>
        <form id={style.form}>
          <div id={style.div1}>
            <p> Elige un título: </p>
            <input
              type='text'
              value={input.title}
              name='title'
              autoComplete='off'
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
              type='text'
              value={input.email}
              name='email'
              autoComplete='off'
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
              type='text'
              value={input.text}
              name='text'
              autoComplete='off'
              onChange={handleChange}
            />
            {errors.text && (
              <div className={style.error}>
                <span> {errors.text}</span>
              </div>
            )}
          </div>

          <button
            type='submit'
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
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
