import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../redux/actions/index.js";
import CardQuestLogOut from "./CardQuestLogOut.js";
import style from "./styles/CardsQuestions.module.css";

const CardsQuestsLogOut = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const pages = useSelector((state) => state.pages);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    dispatch(getAllQuestions(sort, page));
  }, [dispatch, page]);

  // const onChangeSearch = (e) => {
  //   setSearch(e.target.value);
  //   setPage(1);
  //   dispatch(getSearchQuestions(e.target.value, sort, page));
  // };

  const handleClick = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.value));
  };

  // const handlerRefresh = () => {
  //   window.location.reload(false);
  // };

  // const handleSort = (e) => {
  //   setSort(e.target.value);
  //   if (search.length > 0) {
  //     dispatch(getSearchQuestions(search, e.target.value, page));
  //   } else {
  //     dispatch(getAllQuestions(e.target.value, page));
  //   }
  // };

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

      <div className={style.paginado}>
        {pages &&
          pages.map((pag) => (
            <button key={pag} onClick={(e) => handleClick(e)} value={pag}>
              {pag}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CardsQuestsLogOut;
