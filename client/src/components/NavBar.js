import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuestions,
  getAllTags,
  getSearchQuestions,
  setMacrotag,
  setMicrotag,
  setSort,
  setSortValidate,
} from "../redux/actions/index.js";
import style from "./styles/NavBar.module.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const NavBar = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const sort = useSelector((state) => state.sort);
  const validated = useSelector((state) => state.sortValidate);
  const tags = useSelector(state => state.tags)
  const macroTag = useSelector(state => state.filterMacrotag)
  const microTag = useSelector(state => state.filterMicrotag)

  useEffect(() => {
    dispatch(getAllTags())
  }, [dispatch])

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    dispatch(getSearchQuestions(e.target.value, sort, page, validated, macroTag, microTag));
  };

  const handlerRefresh = () => {
    window.location.reload(false);
  };

  const handleSort = (e) => {
    dispatch(setSort(e.target.value));
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, e.target.value, page, validated, macroTag, microTag));
    } else {
      dispatch(getAllQuestions(e.target.value, page, validated, macroTag, microTag));
    }
  };

  const handleSortValidate = (e) => {
    dispatch(setSortValidate(e.target.value));
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, sort, page, e.target.value, macroTag, microTag));
    } else {
      dispatch(getAllQuestions(sort, page, e.target.value, macroTag, microTag));
    }
  };

  const handleMacroTag = (e) => {
    dispatch(setMacrotag(e.target.value))
    dispatch(setMicrotag('All'))
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, sort, page, validated, e.target.value, 'All'));
    } else {
      dispatch(getAllQuestions(sort, page, validated, e.target.value, 'All'));
    }
  }

  const handleMicroTag = (e) => {
    dispatch(setMicrotag(e.target.value))
    if (search.length > 0) {
      dispatch(getSearchQuestions(search, sort, page, validated, macroTag, e.target.value));
    } else {
      dispatch(getAllQuestions(sort, page, validated, macroTag, e.target.value));
    }
  }

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
              <select value={sort} onChange={handleSort} className={`nav-item dropdown ${style.order}`}>
                <option value="desc" className={style.option}>
                  Más nuevas
                </option>
                <option value="asc" className={style.option}>
                  Más antiguas
                </option>
              </select>
              {/* <select value={validated} onChange={handleSortValidate} className={`nav-item dropdown ${style.order}`}>
                <option value="All" className={style.option}>
                  Todas
                </option>
                <option value="true" className={style.option}>
                  Validadas
                </option>
                <option value="false" className={style.option}>
                  No Validadas
                </option>
              </select> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Validadas</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={validated}
                    label="Validadas"
                    onChange={handleSortValidate}
                  >
                    <MenuItem value='All'>Todas</MenuItem>
                    <MenuItem value='true'>Validadas</MenuItem>
                    <MenuItem value='false'>No validadas</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <select value={macroTag} onChange={handleMacroTag} className={`nav-item dropdown ${style.order}`} >
                <option value='All'>Todos</option>
                {tags?.map(e => 
                  (
                    <option key={e.id} value={e.tag}>{e.tag}</option>
                  )
                )}
              </select>
              <select value={microTag} onChange={handleMicroTag} className={`nav-item dropdown ${style.order}`}>
                <option value='All'>Todos</option>
                {/* Falta renderizar todos los microTags */}
                {tags.filter(e => e.tag === macroTag).flatMap(e => e.microTags).map(e => (
                  <option key={e.id} value={e.tag}>{e.tag}</option>
                ))}
              </select>
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
