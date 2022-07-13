import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAnswers, getNotifications } from "../redux/actions";
import style from "./styles/MisRespuestas.module.css";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading";
import CardUserAnswer from "../components/CardUserAnswer";
import Paginated from "../components/Paginated";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
import { useNavigate } from "react-router-dom";
import quest from "../images/question.png";

const MisRespuestas = () => {
  const { isAuthenticated, user } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answers);
  const totalPages = useSelector((state) => state.totalPages);
  const [page, setPage] = useState(1);
  const [isModify, setIsModify] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAnswers(userInfo.sub, page, setLoading));
  }, [dispatch, userInfo.sub, page, totalPages, isModify]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications(user.sub))
    }
  }, [dispatch, user, isAuthenticated]);

  function redirectAnswer() {
    navigate("/");
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else if (user.email_verified === false) {
    return (
      <>
        <NotVerified />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else if (userInfo.statusBanned === true) {
    return (
      <>
        <BannedUser />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else
    return (
      <div>
        <div className={style.fullContainer}>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-12 ${style.col1}`}>
                <div id={style.all}>
                  <div id={style.explore}>
                    <p className={style.title}> Mis respuestas</p>
                  </div>
                  <div id={style.myQuestions}>
                    {answers.length > 0 ? (
                      answers.map((r) => {
                        return (
                          <CardUserAnswer
                            key={r.id}
                            id={r.id}
                            qid={r.question.id}
                            title={r.question.title}
                            text={r.text}
                            likes={r.likes}
                            tPoints={r.teachPoints}
                            setIsModify={setIsModify}
                            statusValidated={r.statusValidated}
                            nickname={r.question.user.nickname}
                            picture={r.question.user.picture}
                          />
                        );
                      })
                    ) : (
                      <div>
                        <button
                          className={style.btnCreate}
                          onClick={redirectAnswer}
                        >
                          Responde una pregunta
                          <img
                            src={quest}
                            alt=""
                            className={style.imgQuest}
                            height="20px"
                            width="20px"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <Paginated
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
};

export default MisRespuestas;
