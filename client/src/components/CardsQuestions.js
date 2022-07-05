import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions, getSearchQuestions } from "../redux/actions/index.js";
import CardQuestion from "./CardQuestion.js";
import Paginated from "./Paginated";
import style from "./styles/CardsQuestions.module.css";

const CardsQuestions = ({ isFavorite, setIsFavorite, search }) => {
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
  }, [dispatch, page, isFavorite]);

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
              setIsFavorite={setIsFavorite}
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
