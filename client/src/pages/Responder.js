import React, { useEffect, useState } from "react";
import style from "./styles/Responder.module.css";
import Footer from "../components/Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuestion,
  sendAnswer,
  getUserInfo,
  getNotifications,
  deleteQuestion,
} from "../redux/actions/index";
import SimpleAnswer from "../components/SimpleAnswer";
import Loading from "../components/Loading";
import ReactMarkdown from "react-markdown";
import Highlighter from "../components/Highlighter";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Paginated from "../components/Paginated";
import MensajeAlerta from "../components/MensajeAlerta";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
import NotFound from "./NotFound";

const Responder = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const question = useSelector((state) => state.question);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingImg, setLoadingImg] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = useSelector((state) => state.totalPages);
  const [permiteIMG, setPermiteIMG] = useState(true);
  const navigate = useNavigate();
  //form
  const userInfo = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (page > 1 && page > totalPages) setPage((prev) => prev - 1);
    dispatch(getQuestion(parseInt(questionId), page, setLoad, setLoading));
  }, [dispatch, load, questionId, isModify, page, totalPages]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInfo(user.sub));
      dispatch(getNotifications(user.sub));
    }
    // eslint-disable-next-line
  }, [isModify]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setError(validate(e.target.value));
  };

  const validate = (input) => {
    let error = "";
    if (!input) error = "Se requiere escribir una respuesta";
    if (input.length < 10)
      error = "La respuesta debe tener como mínimo 10 caracteres";
    if (input.length > 600)
      error = "La respuesta debe tener como máximo 600 caracteres";
    return error;
  };
  const textAlerta = "Respuesta enviada";
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendAnswer({ sub: userInfo.sub, id: questionId, text: input }));
    setLoad(true);
    setInput("");
    if (!permiteIMG) setPermiteIMG(true);
    MensajeAlerta({ textAlerta });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  function handleClick() {
    setInput(
      input + "\n```javascript\n(escribe tu código javascript aquí)\n```"
    );
  }

  async function uploadImage(e) {
    const files = e.target.files;
    if (files[0]) {
      setLoadingImg(true);
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "codebugImages");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/codebugers/image/upload",
        data
      );
      const file = res.data;
      setInput(input + `\n\n![image](${file.secure_url})\n\n`);
      setLoadingImg(false);
      setPermiteIMG(false);
    }
  }

  //Rescue URL-Image from text to download
  const [url, setUrl] = useState("");
  const [nameFile, setNameFile] = useState("");

  const textAlerta1 = "No hay imágenes disponibles para descargar";
  const handleseparar = () => {
    if (question.text.includes("(https://res.cloudinary.com")) {
      const separado = question.text.split("(https://res.cloudinary.com");
      let listo1 = "https://res.cloudinary.com" + separado[1];
      const length = listo1.length;
      listo1 = listo1.slice(0, length - 3);
      setUrl(listo1);

      const segundo = listo1.split("/");
      const tamanhoSegundo = segundo.length - 1;
      const casiFinal = segundo[tamanhoSegundo];
      const anteUltimo = casiFinal.split(")");
      const ultimo = anteUltimo[0];
      setNameFile(ultimo);

      window.open(listo1);
    } else {
      MensajeAlerta({ textAlerta: textAlerta1 });
    }
  };

  // Editar y eliminar pregunta

  async function handleDeleteQuestion(e) {
    e.preventDefault();
    setIsModify(true);
    await dispatch(
      deleteQuestion({ id: question.id, statusDeleted: true }, setIsModify)
    );
    navigate("/");
  }

  const confirm = (e) => {
    confirmAlert({
      title: "Confirma borrar la pregunta",
      message: "¿Está seguro de esto?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handleDeleteQuestion(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (isAuthenticated && user.email_verified === false) {
    return (
      <>
        <NotVerified />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else if (isAuthenticated && userInfo.statusBanned === true) {
    return (
      <>
        <BannedUser />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } 
  if (!question.id) {
    return <NotFound />
  } else
    return (
      <div className={style.fullContainer}>
        {question.user ? (
          <div className={style.middleRow}>
            {/* Acá el contenido para logueados */}
            {question && (
              <div className={style.question}>
                <div className={`container ${style.container}`}>
                  <div className={`row ${style.middleRow1}`}>
                    {/* <div className={`col-lg ${style.col1}`}> */}

                    <div className={`col-lg-1 ${style.pictureBox}`}>
                      <img
                        className={style.userImage}
                        src={question?.user.picture}
                        alt="imagen de usuario"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className={`col-lg-9 ${style.leftBox}`}>
                      <div className={style.TitleAndExtrasBox}>
                        <div className={style.userPreg}>
                          <p>{question?.user.nickname} pregunta:</p>
                        </div>
                        <div className={style.Title}>
                          <p>{question?.title}</p>
                        </div>
                        <div className={style.Extras}>
                          <p>
                            Respuestas: {question?.cantAnswers} - T. Points:{" "}
                            {question?.teachPoints}
                          </p>
                        </div>
                      </div>
                      {/* <div className={style.questionText}>{question?.text}</div> */}
                      <div className={style.questionText}>
                        <ReactMarkdown
                          children={question?.text}
                          components={{ code: Highlighter }}
                        />
                      </div>
                      <div className={style.bajo}>
                        <div id={style.tags}>
                          {question.macroTags?.map((macro) => (
                            <span key={macro.tag} className={style.tag}>
                              {" "}
                              #{macro.tag}{" "}
                            </span>
                          ))}
                          {question.microTags?.map((micro) => (
                            <span key={micro.tag} className={style.tag}>
                              {" "}
                              #{micro.tag}{" "}
                            </span>
                          ))}
                        </div>

                        <div className={style.btns}>
                          <div>
                            <form action={url} target="_blank" rel="noreferrer">
                              <Tooltip title="Abrir imagen en tamaño completo">
                                <DownloadIcon
                                  className={style.descarga}
                                  fontSize="medium"
                                  color="active"
                                  type="submit"
                                  download={nameFile}
                                  onClick={(e) => handleseparar(e)}
                                />
                              </Tooltip>
                            </form>
                          </div>
                          <div
                            className={
                              userInfo.sub !== question.userSub ||
                              question.statusValidated
                                ? style.none
                                : null
                            }
                          >
                            <Tooltip title="Eliminar">
                              <DeleteIcon
                                fontSize="medium"
                                className={style.deleteBtn}
                                onClick={(e) => confirm(e)}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*----------------FORMULARIO*--------------------*/}

                  <div className={`row ${style.answerForm}`}>
                    <div className={`col-lg-6 ${style.form}`}>
                      <div className={style.input1}>
                        <div className={style.pregBtn}>
                          <div>Escribe una respuesta aqui: </div>
                          <button
                            type="button"
                            className={style.btnCode}
                            onClick={handleClick}
                          >
                            {" "}
                            Código Javascript{" "}
                          </button>
                        </div>
                        <div id={style.text}>
                          <textarea
                            type="text"
                            autoComplete="off"
                            name="text"
                            onChange={handleChange}
                            value={input}
                          ></textarea>
                        </div>
                        <div className={style.error}>
                          {error && (
                            <div className={style.errorMessage}>
                              <span> {error}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={style.input2}>
                        <p> Vista previa: </p>
                        <ReactMarkdown
                          children={input}
                          className={style.markdown}
                          components={{ code: Highlighter }}
                        />
                      </div>
                    </div>

                    <div
                      className={permiteIMG ? style.adjBox : style.adjBoxNone}
                    >
                      <span className={style.adjText}>Adjuntar imagen:</span>
                      <input
                        type="file"
                        name="file"
                        placeholder="Click para elegir"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => uploadImage(e)}
                      />
                      {loadingImg && (
                        <span className={style.loaderImg}>Cargando...</span>
                      )}
                    </div>
                    <span
                      className={
                        permiteIMG ? style.adjBoxNone : style.permiteIMG
                      }
                    >
                      Ya se agregó una imagen.
                    </span>

                    {isAuthenticated ? (
                      <div className={style.button}>
                        <button
                          type="submit"
                          onClick={(e) => handleSubmit(e)}
                          className={style.submit}
                          disabled={!input || error}
                        >
                          Enviar respuesta
                        </button>
                      </div>
                    ) : (
                      <div className={style.button}>
                        <button
                          type="submit"
                          onClick={handleLogIn}
                          className={style.submit}
                        >
                          <span>Logueate para responder</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <br></br>
                  <div className={style.answers}>
                    <p>Respuestas: </p>
                    {question &&
                      question?.answers.results.map((e) => (
                        <SimpleAnswer
                          key={e.id}
                          id={e.id}
                          text={e.text}
                          likes={e.likes}
                          nickname={e.user.nickname}
                          subQ={question.userSub}
                          subR={e.userSub}
                          picture={e.user.picture}
                          statusValidated={e.statusValidated}
                          setIsModify={setIsModify}
                          cantSubAnswers={e.cantSubAnswers}
                          subAnswers={e.subAnswers}
                        />
                      ))}
                  </div>
                  {/* </div> */}
                  <Paginated page={page} setPage={setPage} />
                </div>
              </div>
            )}{" "}
          </div>
        ) : (
          <Loading />
        )}
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
};

export default Responder;
