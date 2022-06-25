import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Responder.module.css";
import Footer from "../components/Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion } from "../redux/actions/index";
import like from "../images/like2.png"
import dislike from "../images/dislike2.png"
import denuncia from "../images/denuncia2.png"
import favorito from "../images/favorito2.png"
import SimpleAnswer from "../components/SimpleAnswer";

const Responder = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const {questionId} = useParams()
  
  useEffect(()=>{
    alert('entre al useEffect')
    dispatch(getQuestion(questionId))
    console.log(question)
  },[dispatch])
  
  const question = useSelector((state)=>state.question);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.col1}`}>
                {
                  question && (<div className={style.question}>
                    <div className={`col-2-lg ${style.pictureBox}`}>
                    <img
                    className={style.userImage}
                    src={question.user["picture"]}
                    alt="imagen de usuario"
                    />
                    </div>
                  <div className={`col-8-lg ${style.leftBox}`}>
                        <div className={style.TitleAndExtrasBox}>
                            <div className={style.userPreg}>
                                <h6>{question.user.name} pregunta:</h6>
                            </div>
                            <div className={style.Title}>
                                <h6>{question.title}</h6>
                            </div>
                            <div className={style.Extras}>
                                <h6>
                                    Respuestas:{question.cantAnswers} - T.Points:{question.teachPoints}
                                </h6>                 
                            </div>
                        </div>
                        <div className={style.questionText}>
                                  {question.text}
                        </div>
                        <div className={style.bajoTexto}>
                            <div className={style.likes}>
                                {question.likes}
                                <img /*onClick={()=> handlerLike()}*/ src={like} alt="mano arriba" className={style.like}/>
                                <img /*onClick={()=> handlerDislike()}*/ src={dislike} alt="mano abajo" className={style.dislike}/>
                            </div>
                            <div>
                                <img src={favorito} alt="favorito" className={style.like}/>
                            </div>
                            <div>
                                <img src={denuncia} alt="denuncia" className={style.like}/>
                            </div>
                        </div>
                </div>
                </div>)
                    
                  

                  
                }
                <br></br>
                <div className={style.userAnswer}>
                          form answer
                </div>
                <br></br>
                <div className={style.answers}>
                         <p>Respuestas: </p>
                          {question && question.answers.map((e)=>
                              <SimpleAnswer
                                  key={e.id}
                                  text={e.text}
                                  likes={e.likes}
                                  userSub={e.userSub}
                              />
                          )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.colOut}`}>
                No logeado
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Responder;
