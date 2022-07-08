import React, { useState } from "react";
import { postMessage } from "../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/FormContact.module.css";

const FormContact = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  // useEffect(()=> {
  //     dispatch(getUserInfo());
  // }, [dispatch])

  function validate(input) {
    let errors = {};
    if (!input.title) errors.title = "Se requiere un título";
    if (input.title.length > 30) errors.title = "Máximo 30 caracteres";
    if (!input.email) errors.email = "Se requiere un email";
    if (input.email.length > 30) errors.email = "Máximo 30 caracteres";
    if (
      input.email &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
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
    email: localStorage.emailContact || "",
    title: localStorage.titleContact || "",
    text: localStorage.textContact || "",
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
    const property = e.target.name + "Contact";
    localStorage[property] = e.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let message = {
      sub: user.sub,
      email: input.email,
      title: input.title,
      text: input.text,
    };
    dispatch(postMessage(message));
    alert("Mensaje enviado");
    setInput({
      email: "",
      title: "",
      text: "",
    });
    localStorage.removeItem("emailContact");
    localStorage.removeItem("titleContact");
    localStorage.removeItem("textContact");
  }

  return (
    <div id={style.all}>
      <div id={style.title}>
        <h2>Ingresa una consulta, sugerencia o reclamo</h2>
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
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
