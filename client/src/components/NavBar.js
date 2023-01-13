import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  getAllQuestions,
  getAllTags,
  getSearchQuestions,
  setMacrotag,
  setMicrotag,
  setSort,
  setSortValidate,
} from '../redux/actions/index.js';
import style from './styles/NavBar.module.css';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const NavBar = ({ search, setSearch, setPage }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sort);
  const validated = useSelector((state) => state.sortValidate);
  const tags = useSelector((state) => state.tags);
  const macroTag = useSelector((state) => state.filterMacrotag);
  const microTag = useSelector((state) => state.filterMicrotag);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    dispatch(
      getSearchQuestions(e.target.value, sort, 1, validated, macroTag, microTag)
    );
  };

  const handlerRefresh = () => {
    window.location.reload(false);
  };

  const handleSort = (e) => {
    setPage(1);
    dispatch(setSort(e.target.value));
    if (search.length > 0) {
      dispatch(
        getSearchQuestions(
          search,
          e.target.value,
          1,
          validated,
          macroTag,
          microTag
        )
      );
    } else {
      dispatch(
        getAllQuestions(e.target.value, 1, validated, macroTag, microTag)
      );
    }
  };

  const handleSortValidate = (e) => {
    setPage(1);
    dispatch(setSortValidate(e.target.value));
    if (search.length > 0) {
      dispatch(
        getSearchQuestions(search, sort, 1, e.target.value, macroTag, microTag)
      );
    } else {
      dispatch(getAllQuestions(sort, 1, e.target.value, macroTag, microTag));
    }
  };

  const handleMacroTag = (e) => {
    setPage(1);
    dispatch(setMacrotag(e.target.value));
    dispatch(setMicrotag('All'));
    if (search.length > 0) {
      dispatch(
        getSearchQuestions(search, sort, 1, validated, e.target.value, 'All')
      );
    } else {
      dispatch(getAllQuestions(sort, 1, validated, e.target.value, 'All'));
    }
  };

  const handleMicroTag = (e) => {
    setPage(1);
    dispatch(setMicrotag(e.target.value));
    if (search.length > 0) {
      dispatch(
        getSearchQuestions(search, sort, 1, validated, macroTag, e.target.value)
      );
    } else {
      dispatch(getAllQuestions(sort, 1, validated, macroTag, e.target.value));
    }
  };

  const [tagstest, setTagstest] = useState([]);

  useEffect(() => {
    fetch('https://co-debug-production.up.railway.app/tags')
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        setTagstest(response);
      });
  }, []);
  console.log('test', tagstest);

  return (
    <div className={`container-fluid ${style.optionSearch}`}>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-warning ${style.navbar}`}
      >
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={`d-flex ${style.navSearch}`}>
            <TextField
              id='outlined-basic'
              onChange={onChangeSearch}
              type='search'
              label='Buscar...'
              variant='outlined'
            />
          </div>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${style.ul}`}>
              <FormControl sx={{ width: 140, margin: 0.5 }}>
                <InputLabel id='demo-simple-select-label'>Creación</InputLabel>
                <Select value={sort} label='Creacion' onChange={handleSort}>
                  <MenuItem value='desc'>Más nuevas</MenuItem>
                  <MenuItem value='asc'>Más antiguas</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: 140, margin: 0.5 }}>
                <InputLabel>Validadas</InputLabel>
                <Select
                  value={validated}
                  label='Validadas'
                  onChange={handleSortValidate}
                >
                  <MenuItem value='All'>Todas</MenuItem>
                  <MenuItem value='true'>Validadas</MenuItem>
                  <MenuItem value='false'>No validadas</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: 140, margin: 0.5 }}>
                <InputLabel>Macrotag</InputLabel>
                <Select
                  value={macroTag}
                  label='Macrotag'
                  onChange={handleMacroTag}
                >
                  <MenuItem value='All'>Todos</MenuItem>
                  {tags &&
                    tags.map((e) => (
                      <MenuItem key={e.id} value={e.tag}>
                        {e.tag}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: 140, margin: 0.5 }}>
                <InputLabel>Microtag</InputLabel>
                <Select
                  value={microTag}
                  label='Microtag'
                  onChange={handleMicroTag}
                >
                  <MenuItem value='All'>Todos</MenuItem>
                  {macroTag !== 'All'
                    ? tags
                        .filter((e) => e.tag === macroTag)
                        .flatMap((e) => e.microTags)
                        .map((e) => (
                          <MenuItem key={e.id} value={e.tag}>
                            {e.tag}
                          </MenuItem>
                        ))
                    : ''}
                </Select>
              </FormControl>
            </ul>

            <button
              onClick={() => handlerRefresh()}
              className={`btn btn-outline-dark ${style.refresh}`}
              type='button'
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
