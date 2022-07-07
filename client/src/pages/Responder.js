import React, { useEffect, useState } from "react";
import style from "./styles/Responder.module.css";
import Footer from "../components/Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion, sendAnswer, getUserInfo } from "../redux/actions/index";
// import like from "../images/like2.png";
// import dislike from "../images/dislike2.png";
// import denuncia from "../images/denuncia2.png";
// import favorito from "../images/favorito2.png";
import SimpleAnswer from "../components/SimpleAnswer";
import Loading from "../components/Loading";
import ReactMarkdown from 'react-markdown';
import Highlighter from '../components/Highlighter';
import { useAuth0 } from "@auth0/auth0-react";

const Responder = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const question = useSelector((state) => state.question);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true)
  const [isModify, setIsModify] = useState(false);
  //form
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getQuestion(parseInt(questionId), setLoad, setLoading));
  }, [dispatch, load, questionId, isModify]);

  
  useEffect(() => {
    if (isAuthenticated)
    dispatch(getUserInfo(user.sub));
  }, [isModify]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setError(validate(e.target.value));
  };

  const validate = (input) => {
    let error = "";
    if (!input) error = "Se requiere escribir una respuesta";
    if (input.length < 10)
      error = "La respuesta debe tener minimo 10 caracteres";
    if (input.length > 500)
      error = "La respuesta debe tener como máximo 500 caracteres";
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendAnswer({ sub: user.sub, id: questionId, text: input }));
    setLoad(true);
    setInput("");
    alert("Respuesta enviada");
  };

  function handleClick() {
    setInput(input + "\n```javascript\n(escribe tu código javascript aquí)\n```")
}


  if(loading){
    return (
      <>
        <Loading />
      </>
    )
  } else return (

    <div className={style.fullContainer}>
      {question.user ? 
      (
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
                        <p>{question?.user.name} pregunta:</p>
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
                    {/* <div className={style.bajoTexto}>
                      <div className={style.likes}>
                        {question?.likes}
                        <img
                          onClick={()=> handlerLike()} src={like}
                          alt="mano arriba"
                          className={style.like}
                        />
                        <img
                          onClick={()=> handlerDislike()} src={dislike}
                          alt="mano abajo"
                          className={style.dislike}
                        />
                      </div>
                      <div>
                        <img
                          src={favorito}
                          alt="favorito"
                          className={style.like}
                        />
                      </div>
                      <div>
                        <img
                          src={denuncia}
                          alt="denuncia"
                          className={style.like}
                        />
                      </div>
                    </div> */}
                  </div>

                </div>

                {/*----------------FORMULARIO*--------------------*/}

                <div className={`row ${style.answerForm}`}>
                  <div className={`col-lg-6 ${style.form}`}>
                    {/* <form> */}
                    <div className={style.input1}>

                      <div className={style.pregBtn}>
                        <div>Escribe una respuesta aqui: </div>
                        <button type='button' className={style.btnCode} onClick={handleClick}> Código Javascript </button>
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


                    {/* </form> */}
                  </div>
                  {isAuthenticated?
                    (<div className={style.button}>
                      <button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className={style.submit}
                        disabled={!input || error}
                      >
                        Enviar respuesta
                      </button>
                    </div> ) : (

                      (<div className={style.button}>
                        <button
                          type="submit"
                          onClick={async(e) => await loginWithRedirect()}
                          className={style.submit}
                        >
                          Logueate para responder
                        </button>
                      </div> )
                    )
                  }
                </div>
                <br></br>
                <div className={style.answers}>
                  <p>Respuestas: </p>
                  {question &&
                    question?.answers.map((e) => (
                      <SimpleAnswer
                        key={e.id}
                        id={e.id}
                        text={e.text}
                        likes={e.likes}
                        name={e.user.name}
                        subQ={question.userSub}
                        subR={e.userSub}
                        picture={e.user.picture}
                        statusValidated={e.statusValidated}
                        setIsModify={setIsModify}
                      />
                    ))}
                </div>
                {/* </div> */}
              </div>
            </div>
          )}{" "}
        </div>
      ) : (
          <Loading />
        // <div className={style.total}>
        //   {/* Acá el contenido para no logueados */}
        //   <div className={`container-fluid ${style.container}`}>
        //     <div className={`row ${style.middleRow}`}>
        //       <div className={`col-lg ${style.colOut}`}>
        //         Cargando...
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
    );
};

export default Responder;
