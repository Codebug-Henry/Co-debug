import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../redux/actions/index.js";
import CardQuestion from "./CardQuestion.js";
import Paginated from "./Paginated";
import style from "./styles/CardsQuestions.module.css";

const CardsQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState("desc");

  useEffect(() => {
    dispatch(getAllQuestions(sort, page));
  }, [dispatch, page]);

  return (
    <div className={style.questBox}>
      <div className={style.boxQuestions}>
        {questions &&
          questions.map((e) => (
            <CardQuestion
              cantAnswers={e.cantAnswers}
              nickname={e.user.nickname}
              key={e.id}
              id={e.id}
              likes={e.likes}
              title={e.title}
              text={e.text}
              teachPoints={e.teachPoints}
              picture={e.user.picture}
              sort={sort}
              page={page}
            />
          ))}
      </div>

      <Paginated page={page} setPage={setPage} />

      {/* <div className={style.paginado}>
        {pages &&
          pages.map((pag) => (
            <button key={pag} onClick={(e) => handleClick(e)} value={pag}>
              {pag}
            </button>
          ))}
      </div> */}
    </div>
  );
};

export default CardsQuestions;
