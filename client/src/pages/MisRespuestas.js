import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAnswers } from '../redux/actions'
import style from "./styles/MisRespuestas.module.css";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading";
import CardUserAnswer from "../components/CardUserAnswer";
import Paginated from "../components/Paginated";
import { useNavigate } from "react-router-dom";

const MisRespuestas = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const answers = useSelector(state=> state.answers);
  const totalPages = useSelector(state=> state.totalPages);
  const [page, setPage] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserAnswers(user.sub, 1))
  }, [dispatch, user.sub])

  function redirectAnswer () {
    navigate('/')
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  
  return (
    <div>
      {isAuthenticated ? (
        <div className={style.fullContainer}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-12 ${style.col1}`}>
                <div id={style.all}>
                  <div id={style.explore}>
                    <p> Mis respuestas</p>
                  </div>
                  <div id={style.myQuestions}>
                    {
                      answers.length > 0 ?
                      answers.map(r => {
                          return (
                            <CardUserAnswer key={r.id} id={r.question.id} title={r.question.title} text={r.text} likes={r.likes} tPoints={r.teachPoints}
                                            name={user.nickname} picture={user.picture}  />
                          )
                      }) :
                      <div>
                          <button className={style.btnCreate} onClick={redirectAnswer}>
                            Responde una pregunta 
                            {/* <img src={quest} alt='' className={style.imgQuest} height='20px' width='20px' /> */}
                          </button>
                      </div>
                    }

                  </div>
                  <Paginated page={page} setPage={setPage} totalPages={totalPages}/>
                </div>
              </div>

              {/* <div className={`col-lg-2 ${style.col2}`}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.colOut}`}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat." "Sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MisRespuestas;
