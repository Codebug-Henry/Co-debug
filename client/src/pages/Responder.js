import React, { useEffect, useState } from "react";
import style from "./styles/Responder.module.css";
import Footer from "../components/Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion, sendAnswer } from "../redux/actions/index";
// import like from "../images/like2.png";
// import dislike from "../images/dislike2.png";
// import denuncia from "../images/denuncia2.png";
// import favorito from "../images/favorito2.png";
import SimpleAnswer from "../components/SimpleAnswer";
import Loading from "../components/Loading";

const Responder = () => {
  // const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const question = useSelector((state) => state.question);
  const [load, setLoad] = useState(false);
  //form
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getQuestion(parseInt(questionId), setLoad));
  }, [dispatch, load]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setError(validate(e.target.value));
  };

  const validate = (input) => {
    let error = "";
    if (!input) error = "Se requiere escribir una respuesta";
    if (input.length < 10)
      error = "La respuesta debe tener minimo 10 caracteres";
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendAnswer({ sub: user.sub, id: questionId, text: input }));
    setLoad(true);
    setInput("");
    alert("Respuesta enviada");
  };

  return (

    <div className={style.fullContainer}>
      {question.user ? 
      (
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          {question && (
            <div className={style.question}>
              <div className={`container ${style.container}`}>
                <div className={`row ${style.middleRow}`}>
                  {/* <div className={`col-lg ${style.col1}`}> */}

                  <div className={`col-lg-2 ${style.pictureBox}`}>
                    <img
                      className={style.userImage}
                      src={question?.user.picture}
                      alt="imagen de usuario"
                    />
                  </div>
                  <div className={`col-lg-6 ${style.leftBox}`}>
                    <div className={style.TitleAndExtrasBox}>
                      <div className={style.userPreg}>
                        <p>{question?.user.name} pregunta:</p>
                      </div>
                      <div className={style.Title}>
                        <p>{question?.title}</p>
                      </div>
                      <div className={style.Extras}>
                        <p>
                          Respuestas: {question?.cantAnswers} - T.Points:{" "}
                          {question?.teachPoints}
                        </p>
                      </div>
                    </div>
                    <div className={style.questionText}>{question?.text}</div>
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
                    <form>
                      <div className={style.write}>
                        <p>Escribe una respuesta aqui: </p>
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
                    </form>
                  </div>

                  <div className={style.button}>
                    <button
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      className={style.submit}
                      disabled={!input || error}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
                <br></br>
                <div className={style.answers}>
                  <p>Respuestas: </p>
                  {question &&
                    question?.answers.map((e) => (
                      <SimpleAnswer
                        key={e.id}
                        text={e.text}
                        likes={e.likes}
                        userSub={e.userSub}
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
