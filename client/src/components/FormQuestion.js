import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, sendQuestion } from "../redux/actions/index";
import style from "./styles/FormQuestion.module.css";
import InfoPopper from "./InfoPopper";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Highlighter from "./Highlighter";
import axios from "axios";
import MensajeAlerta from "./MensajeAlerta";

const FormQuestion = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const tags = useSelector((state) => state.tags);
  const [permiteIMG, setPermiteIMG] = useState(true);
  const [errors, setErrors] = useState({});  
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: localStorage.titleQuestion || "",
    text: localStorage.textQuestion || "",
    macroTag: localStorage.macroTagQuestion
    ? JSON.parse(localStorage.macroTagQuestion)
    : [],
    microTag: localStorage.microTagQuestion
    ? JSON.parse(localStorage.microTagQuestion)
    : [],
  });
  let sub = userInfo.sub;
  
  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    if(input.title || input.text || input.macroTag.length > 0 || input.microTag.length > 0){
      setErrors(
        validate({
          title: input.title,
          text: input.text,
          macroTag: input.macroTag,
          microTag: input.microTag
        })
      )
    }
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate();

  function validate(input) {
    let errors = {};
    if (!input.title) errors.title = "Se requiere un título";
    if (input.title.length > 80)
      errors.title = "Título debe tener un máximo de 80 caracteres";
    if (!input.text) errors.text = "Se requiere una pregunta";
    if (input.text.length > 6000)
      errors.text = "La pregunta debe tener un máximo de 6000 caracteres";
    if (input.macroTag.length === 0)
      errors.macroTag = "Selecciona al menos un macroTag";
    if (input.macroTag.length && input.macroTag.length > 2)
      errors.macroTag = "Selecciona como máximo 2 macroTag";
    if (input.microTag.length === 0)
      errors.microTag = "Selecciona al menos un microTag";
    if (input.microTag.length && input.microTag.length > 3)
      errors.microTag = "Selecciona como máximo 3 microTag";

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
    const property = e.target.name + "Question";
    localStorage[property] = e.target.value;
  }

  function handleSelectMicroTag(e) {
    if (!input.microTag.includes(e.target.value)) {
      setInput({
        ...input,
        microTag: [...input.microTag, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          microTag: [...input.microTag, e.target.value],
        })
      );
      localStorage.microTagQuestion = JSON.stringify([
        ...input.microTag,
        e.target.value,
      ]);
    } else {
      MensajeAlerta({ textAlerta });
    }
  }
  const textAlerta = "Ese Tag ya fue elegido";
  function handleSelectMacroTag(e) {
    if (!input.macroTag.includes(e.target.value)) {
      setInput({
        ...input,
        macroTag: [...input.macroTag, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          macroTag: [...input.macroTag, e.target.value],
        })
      );
      localStorage.macroTagQuestion = JSON.stringify([
        ...input.macroTag,
        e.target.value,
      ]);
    } else {
      MensajeAlerta({ textAlerta });
    }
  }

  function handleDeleteMicroTag(e) {
    const filteredMicroTags = input.microTag.filter((m) => m !== e);
    setInput({
      ...input,
      microTag: filteredMicroTags,
    });
    setErrors(
      validate({
        ...input,
        microTag: filteredMicroTags,
      })
    );
    localStorage.microTagQuestion = JSON.stringify(filteredMicroTags);
  }

  function handleDeleteMacroTag(e) {
    const filteredMacroTags = input.macroTag.filter((m) => m !== e);
    const deletedMacroTag = input.macroTag.filter((m) => m === e).toString();
    const deletedMicroTags = tags.filter(e=> e.tag === deletedMacroTag).map(e=>e.microTags)
    const deletedMicroTags2 = deletedMicroTags[0].map(e=>e.tag);
    const micros = input.microTag
    var deleted = [];
    for (let i = 0; i < deletedMicroTags2.length; i++) {
        for (let j = 0; j < micros.length; j++) {
            if(deletedMicroTags2[i] === micros[j]) 
            deleted.push(deletedMicroTags2[i])
        }
    }
    var newInput = [];
    for (var i = 0; i < micros.length; i++) {
        var igual=false;
         for (let j = 0; j < deleted.length & !igual; j++) {
             if(micros[i] === deleted[j])
                     igual=true;
         }
        if(!igual)newInput.push(micros[i]);
    }
    setInput({
      ...input,
      macroTag: filteredMacroTags,
      microTag: newInput
    });
    setErrors(
      validate({
        ...input,
        macroTag: filteredMacroTags,
        microTag: newInput
      })
    );
    localStorage.macroTagQuestion = JSON.stringify(filteredMacroTags);
    localStorage.microTagQuestion = JSON.stringify(newInput);
  }


  async function handleSubmit(e) {
    const textAlerta = "Pregunta creada";
    e.preventDefault();
    await dispatch(
      sendQuestion({
        sub,
        title: input.title,
        text: input.text,
        macroTags: input.macroTag,
        microTags: input.microTag,
      })
    );
    MensajeAlerta({ textAlerta });
    setInput({
      title: "",
      text: "",
      macroTag: [],
      microTag: [],
    });
    localStorage.removeItem("titleQuestion");
    localStorage.removeItem("textQuestion");
    localStorage.removeItem("microTagQuestion");
    localStorage.removeItem("macroTagQuestion");
    navigate("/mispreguntas");
  }

  function handleClick() {
    setInput({
      ...input,
      text: input.text + "\n```javascript\n(escribe tu código javascript aquí)\n```",
    });
  }

  async function uploadImage(e) {
    const files = e.target.files;
    if (files[0]) {
      setLoading(true);
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "codebugImages");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/codebugers/image/upload",
        data
      );
      const file = res.data;
      setInput({
        ...input,
        text: input.text + `\n\n![image](${file.secure_url})\n\n`,
      });
      setLoading(false);
      setPermiteIMG(false);
    }
  }

  return (
    <div id={style.all}>
      <div id={style.title}>
        <span>Ingresa una pregunta</span>
        <InfoPopper className={style.popper} />
      </div>
      <div id={style.contenedor}>
        <form id={style.form}>
          <div id={style.div1}>
            <div className={style.labelTitle}> Elige un título: </div>
            <input
              type="text"
              value={input.title}
              name="title"
              autoComplete="off"
              className={style.inputTitle}
              onChange={handleChange}
            />
            {errors.title && (
              <div className={style.error}>
                <span> {errors.title}</span>
              </div>
            )}
          </div>
          <div className={style.view}>
            <div className={style.div2}>
              <div className={style.pregBtn}>
                <div> Ingresa tu pregunta: </div>
                <button
                  type="button"
                  className={style.btnCode}
                  onClick={handleClick}
                >
                  {" "}
                  Código Javascript{" "}
                </button>
              </div>

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
            <div className={style.div2}>
              <p className={style.vistaPrevia}> Vista previa: </p>
              <ReactMarkdown
                children={input.text}
                className={style.markdown}
                components={{ code: Highlighter }}
              />
            </div>
          </div>               
          <div className={permiteIMG ? style.adjBox : style.adjBoxNone}>
            <span className={style.adjText}>Adjuntar imagen:</span>
            <input
              type="file"
              name="file"
              placeholder="Click para elegir"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => uploadImage(e)}
            />
            {loading && <span className={style.loader}>Cargando...</span>}
          </div>
          <span className={ permiteIMG ? style.adjBoxNone : style.permiteIMG} >
             Ya se agregó una imagen.
          </span>
          <div id={style.div3}>
            <div className={style.macroTag1}>
              <div className={style.macro}>
                <label> MacroTags: </label>
                {/* <select value={input.macroTag} className={style.select} onChange={handleSelectMacroTag} >
                                    <option hidden value='' selected>Selecciona</option> */}
                <select
                  defaultValue=""
                  className={style.select}
                  onChange={handleSelectMacroTag}
                >
                  <option hidden value="">
                    Selecciona
                  </option>
                  {tags &&
                    tags.map((tag) => (
                      <option value={tag.tag} key={tag.id}>
                        {" "}
                        {tag.tag}{" "}
                      </option>
                    ))}
                </select>
              </div>
              <div className={style.selected1}>
                <div className={style.selected}>
                  <span>Macrotags seleccionados: {input.macroTag.length}</span>
                </div>
                <div className={style.list}>
                  {input.macroTag.map((macro) => (
                    <div key={macro}>
                      <span>{macro}</span>
                      <button
                        type="button"
                        className={style.btnDelete}
                        onClick={() => handleDeleteMacroTag(macro)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {errors.macroTag && (
              <div className={style.error}>
                <span> {errors.macroTag}</span>
              </div>
            )}
          </div>
          <div id={style.div3}>
            <div className={style.macroTag1}>
              <div className={style.macro}>
                <label> MicroTags: </label>
                <select
                  defaultValue=""
                  className={style.select}
                  onChange={handleSelectMicroTag}
                >
                  <option hidden value="">
                    Selecciona
                  </option>
                  {input.macroTag.length &&
                    tags
                      .filter((t) => input.macroTag.includes(t.tag))
                      .map((e) =>
                        e.microTags.map((micro) => (
                          <option value={micro.tag} key={micro.id}>
                            {" "}
                            {micro.tag}{" "}
                          </option>
                        ))
                      )}
                </select>
              </div>
              <div className={style.selected1}>
                <div className={style.selected}>
                  <span>Microtags seleccionados: {input.microTag.length}</span>
                </div>
                <div className={style.list}>
                  {input.microTag.map((micro) => (
                    <div key={micro}>
                      <span>{micro}</span>
                      <button
                        type="button"
                        className={style.btnDelete}
                        onClick={() => handleDeleteMicroTag(micro)}
                      >
                        {/* <img src={deleteIcon} alt="X" width='15px' height='15px' /> */}
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {errors.microTag && (
              <div className={style.error}>
                <span> {errors.microTag}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={
              !input.title ||
              !input.text ||
              input.macroTag.length === 0 ||
              input.microTag.length > 3 ||
              input.macroTag.length > 3 ||
              input.microTag.length === 0 ||
              errors.title ||
              errors.text ||
              errors.macroTag ||
              errors.microTag
            }
            className={style.btn}
          >
            Enviar Pregunta
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormQuestion;
