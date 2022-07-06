import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions, getSearchQuestions } from "../redux/actions/index.js";
import CardQuestLogOut from "./CardQuestLogOut.js";
import Paginated from "./Paginated.js";
import style from "./styles/CardsQuestions.module.css";

const CardsQuestsLogOut = ({ search }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const sort = useSelector(state => state.sort)
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, sort, page));
    } else {
      dispatch(getAllQuestions(sort, page))
    }
    // eslint-disable-next-line
  }, [dispatch, page]);

  return (
    <div className={style.questBox}>
      <div className={style.boxQuestions}>
        {questions &&
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
            />
          ))}
      </div>

      <Paginated page={page} setPage={setPage} />
    </div>
  );
};

export default CardsQuestsLogOut;
