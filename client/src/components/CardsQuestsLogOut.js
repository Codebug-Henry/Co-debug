import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions, getSearchQuestions } from "../redux/actions/index.js";
import CardQuestLogOut from "./CardQuestLogOut.js";
import style from "./styles/CardsQuestions.module.css";

const CardsQuestsLogOut = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const pages = useSelector((state) => state.pages);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('desc')

  useEffect(() => {
    dispatch(getAllQuestions(sort, page));
  }, [dispatch, page]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
    dispatch(getSearchQuestions(e.target.value, sort, page));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.value));
  };

  const handlerRefresh = () => {
    window.location.reload(false);
  };

  const handleSort = (e) => {
    setSort(e.target.value)
    if(search.length > 0){
      dispatch(getSearchQuestions(search, e.target.value, page))
    } else {
      dispatch(getAllQuestions(e.target.value, page))
    }
  }

  return (
    <div className={style.questBox}>
      <div className={`container-fluid ${style.optionSearch}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <select value={sort} onChange={handleSort} className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Antiguedad
                  </span>
                  <option value='desc' className="dropdown-item">
                      <span className="dropdown-item">
                        Más antiguas
                      </span>
                    </option>
                    <option value='asc' className="dropdown-item">
                      <span className="dropdown-item">
                        Más nuevas
                      </span>
                    </option>
                </select>
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tag's General
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <span className="dropdown-item">
                        js
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        python
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        react
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        redux
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        github
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        html
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        css
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link disabled"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    tag
                  </span>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  onChange={(e) => onChangeSearch(e)}
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Search"
                />
                <button
                  onClick={() => handlerRefresh()}
                  className="btn btn-outline-dark"
                  type="submit"
                >
                  Refresh
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
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
