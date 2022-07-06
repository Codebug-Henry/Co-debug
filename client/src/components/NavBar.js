import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuestions,
  getSearchQuestions,
  setSort,
} from "../redux/actions/index.js";
import style from "./styles/NavBar.module.css";

const NavBar = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const sort = useSelector((state) => state.sort);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    dispatch(getSearchQuestions(e.target.value, sort, page));
  };

  const handlerRefresh = () => {
    window.location.reload(false);
  };

  const handleSort = (e) => {
    dispatch(setSort(e.target.value));
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, e.target.value, page));
    } else {
      dispatch(getAllQuestions(e.target.value, page));
    }
  };

  return (
    <div className={`container-fluid ${style.optionSearch}`}>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-warning ${style.navbar}`}
      >
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

          <form className={`d-flex ${style.navSearch}`}>
            <input
              onChange={(e) => onChangeSearch(e)}
              className="form-control me-2"
              type="search"
              placeholder="Buscar preguntas..."
              aria-label="Search"
            />
          </form>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${style.ul}`}>
              <select
                value={sort}
                onChange={handleSort}
                className="nav-item dropdown"
              >
                <option
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  hidden
                >
                  Antiguedad
                </option>

                <option value="desc" className="dropdown-item">
                  Más nuevas
                </option>
                <option value="asc" className="dropdown-item">
                  Más antiguas
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
                  Gral tag's
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <span className="dropdown-item">JS</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Redux</span>
                  </li>
                  <li>
                    <span className="dropdown-item">React</span>
                  </li>
                  <li>
                    <span className="dropdown-item">HTML</span>
                  </li>
                  <li>
                    <span className="dropdown-item">GitHub</span>
                  </li>
                  <li>
                    <span className="dropdown-item">CSS</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Sequelize</span>
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
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Micro tag's
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <span className="dropdown-item">Variables</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Clases</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Arreglos</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Objetos</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Callback</span>
                  </li>
                  <li>
                    <span className="dropdown-item">For in</span>
                  </li>
                  <li>
                    <span className="dropdown-item">For of</span>
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

            <button
              onClick={() => handlerRefresh()}
              className={`btn btn-outline-dark ${style.refresh}`}
              type="submit"
            >
              Refresh
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
