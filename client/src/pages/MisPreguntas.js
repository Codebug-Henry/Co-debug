import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/MisPreguntas.module.css";
import Footer from "../components/Footer.js";
import CardUserQuestion from "../components/CardUserQuestion";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import { getUserQuestions, getUserQuestionsSearch, getNotifications} from "../redux/actions";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Paginated from "../components/Paginated";
import Loading from "../components/Loading";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
import quest from "../images/question.png";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const MisPreguntas = () => {
  const { user } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  const questions = useSelector((state) => state.userQuestions);
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("All");
  const [cantFirstLast, setCantFirstLast] = useState([
    questions.length,
    questions[0],
    questions[4],
  ]);
  const [isModify, setIsModify] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (page > 1 && page > totalPages) setPage((prev) => prev - 1);
    if (input.length > 0) {
      dispatch(
        getUserQuestionsSearch(userInfo.sub, sort, page, input, setLoading)
      );
    } else dispatch(getUserQuestions(userInfo.sub, sort, page, setLoading));
  }, [dispatch, sort, cantFirstLast, page, userInfo.sub, totalPages, input, isModify]);

  useEffect(() => {
      dispatch(getNotifications(user.sub));
  }, [dispatch, user]);

  function redirectQuest() {
    navigate("/preguntar");
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
              <div className={`col-lg-12  ${style.col1}`}>
                <div id={style.all}>
                  <div id={style.filters}>
                    {/* <div className={style.filterIcon}>
                      <FilterAltIcon fontSize="medium" />
                    </div> */}
                    <SearchBar setInput={setInput} setPage={setPage} />
                    <FilterBar sort={sort} setSort={setSort} setPage={setPage}/>
                  </div>
                  <div id={style.explore}>
                    <p> Mis preguntas</p>
                  </div>
                  <div id={style.myQuestions}>
                    {questions.length > 0 ? (
                      questions.map((q) => {
                        return (
                          <CardUserQuestion
                            key={q.id}
                            id={q.id}
                            title={q.title}
                            text={q.text}
                            likes={q.likes}
                            cantAnswers={q.cantAnswers}
                            name={userInfo.nickname}
                            picture={userInfo.picture}
                            setCantFirstLast={setCantFirstLast}
                            setIsModify={setIsModify}
                            statusValidated={q.statusValidated}
                            macroTags={q.macroTags}
                            microTags={q.microTags}
                          />
                        );
                      })
                    ) : (
                      <div>
                        <button
                          className={style.btnCreate}
                          onClick={redirectQuest}
                        >
                          Crea una nueva pregunta
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

export default MisPreguntas;
