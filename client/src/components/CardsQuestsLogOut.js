import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions, getSearchQuestions } from "../redux/actions/index.js";
import CardQuestLogOut from "./CardQuestLogOut.js";
import Paginated from "./Paginated.js";
import Loading from "./Loading.js";
import style from "./styles/CardsQuestions.module.css";
import CardNotFound from "./CardNotFound.js";

const CardsQuestsLogOut = ({ search }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const sort = useSelector(state => state.sort)
  const validated = useSelector((state) => state.sortValidate);
  const macroTag = useSelector(state => state.filterMacrotag)
  const microTag = useSelector(state => state.filterMicrotag)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, sort, page, validated, macroTag, microTag, setLoading));
    } else {
      dispatch(getAllQuestions(sort, page, validated, macroTag, microTag, setLoading));
    }
    // eslint-disable-next-line
  }, [dispatch, page]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else return (
    <div className={style.questBox}>
      <div className={style.boxQuestions}>
        {questions.length > 0 ?
          questions.map((e) => (
            <CardQuestLogOut
              cantAnswers={e.cantAnswers}
              nickname={e.user ? e.user.nickname : "anonimo"}
              key={e.id}
              id={e.id}
              likes={e.likes}
              title={e.title}
              text={e.text}
              teachPoints={e.teachPoints}
              picture={e.user.picture}
              statusValidated={e.statusValidated}
              macroTags={e.macroTags}
              microTags={e.microTags}
            />
          )):
          <CardNotFound />
        }
      </div>

      <Paginated page={page} setPage={setPage} />
    </div>
  );
};

export default CardsQuestsLogOut;
