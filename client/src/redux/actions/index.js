
import {
  GET_RANKING,
  GET_ALL_USERS,
  GET_TOPTEN_RANKING,
  GET_USER_INFO,
  DELETE_USER,
  MODIFY_QUESTION,
  DELETE_QUESTION,
  SEND_QUESTION,
  GET_QUESTION,
  GET_FAVOURITES,
  GET_ALL_QUESTIONS,
  GET_ALL_QUESTIONS_SORTED,
  GET_SEARCH_QUESTIONS,
  GET_USER_QUESTIONS,
  PUT_ANSWER,
  DELETE_ANSWER,
  GET_USER_ANSWERS,
  GET_USER_QUESTIONS_ORDERER,
} from "./actionTypes";

import * as api from "../api";


// RUTAS user - users
export const sendUserInfo = (user) => async (dispatch) => {
  try {
    const { data } = await api.sendUserInfo(user);
    dispatch({ type: GET_USER_INFO, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTopTenRanking = () => async (dispatch) => {
  try {
    const { data } = await api.getTopTenRanking();
    dispatch({ type: GET_TOPTEN_RANKING, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRanking = (sort, page) => async (dispatch) => {
  try {
    const { data } = await api.getRanking(sort, page);
    dispatch({ type: GET_RANKING, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserInfo = (sub) => async (dispatch) => {
  try {
    const { data } = await api.getUserInfo(sub);
    dispatch({ type: GET_USER_INFO, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const putUserInfo = (sub, modify) => async (dispatch) => {
  try {
    await api.putUserInfo(sub, modify);
    // dispatch({ type: MODIFY_USER, payload: data})
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = (sub, deleted) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(sub, deleted);
    dispatch({ type: DELETE_USER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUsers = (page) => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers(page);
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// RUTAS question - questions

export const sendQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await api.sendQuestion(question);
    dispatch({ type: SEND_QUESTION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getQuestion = (id, setLoad) => async (dispatch) => {
  try {
    const { data } = await api.getQuestion(id);
    dispatch({ type: GET_QUESTION, payload: data });
    setLoad && setLoad(false);
  } catch (error) {
    console.log(error.message);
  }
};

export const modifyQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await api.modifyQuestion(question);
    dispatch({ type: MODIFY_QUESTION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await api.deleteQuestion(question);
    dispatch({ type: DELETE_QUESTION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addFavourites = async (sub, qId, boolean) => {
  try {
    await api.addFavourites(sub, qId, boolean);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFavourites = (sub, page) => async (dispatch) => {
  try {
    const { data } = await api.getFavourites(sub, page);
    dispatch({ type: GET_FAVOURITES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllQuestions = (page) => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions(page);
    dispatch({ type: GET_ALL_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllQuestionsSorted = (sort, page) => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestionsSorted(sort, page);
    dispatch({ type: GET_ALL_QUESTIONS_SORTED, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSearchQuestions = (search, page) => async (dispatch) => {
  try {
    const { data } = await api.getSearchQuestions(search, page);
    dispatch({ type: GET_SEARCH_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserQuestions = (sub, page, search) => async (dispatch) => {
  try {
    const { data } = await api.getUserQuestions(sub, page, search);
    dispatch({ type: GET_USER_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserQuestionsOrderer =
  (sub, answered, page) => async (dispatch) => {
    try {
      const { data } = await api.getUserQuestionsOrderer(sub, answered, page);
      dispatch({ type: GET_USER_QUESTIONS_ORDERER, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

// RUTAS ANSWER

export const sendAnswer = (answer) => async (dispatch) => {
  try {
    const { data } = await api.sendAnswer(answer);
    dispatch({ type: "GET_ANSWER", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const sendQuestion = (question) => async (dispatch) => {
//     try {
//         const { data } = await api.sendQuestion(question)
//         dispatch({ type: GET_QUESTION, payload: data})
//     } catch (error) {
//         console.log(error.message)
//     }
// }

export const putAnswer = (answer) => async (dispatch) => {
  try {
    const { data } = await api.putAnswer(answer);
    dispatch({ type: PUT_ANSWER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAnswer = (deleted) => async (dispatch) => {
  try {
    const { data } = await api.deleteAnswer(deleted);
    dispatch({ type: DELETE_ANSWER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserAnswers = (sub, page) => async (dispatch) => {
  try {
    const { data } = await api.getUserAnswers(sub, page);
    dispatch({ type: GET_USER_ANSWERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
