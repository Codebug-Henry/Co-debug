import {
  GET_RANKING,
  CLEAN_RANKING,
  GET_ALL_USERS,
  GET_TOPTEN_RANKING,
  GET_USER_INFO,
  DELETE_USER,
  MODIFY_QUESTION,
  DELETE_QUESTION,
  SEND_QUESTION,
  GET_QUESTION,
  CLEAN_QUESTION,
  GET_FAVOURITES,
  CLEAN_FAVOURITES,
  GET_ALL_QUESTIONS,
  GET_SEARCH_QUESTIONS,
  GET_USER_QUESTIONS,
  CLEAN_USER_QUESTIONS,
  PUT_ANSWER,
  DELETE_ANSWER,
  GET_USER_ANSWERS,
  CLEAN_ANSWERS,
  GET_USER_QUESTIONS_ORDERER,
  POST_MESSAGE,
  GET_ALL_MESSAGES,
  GET_ALL_TAGS,
  GET_ALL_ADMINS,
  GET_SEARCH_USERS,
  GET_ALL_USERS_NOADMIN,
  GET_ALL_ALERTS,
  PUT_MESSAGE,
  SET_SORT,
  CLEAN_QUESTIONS
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

export const cleanRanking = () => {
  return {type: CLEAN_RANKING}
}

export const getUserInfo = (sub) => async (dispatch) => {
  try {
    const { data } = await api.getUserInfo(sub);
    dispatch({ type: GET_USER_INFO, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const putUserInfo = (sub, modify, setLoading) => async (dispatch) => {
  try {
    await api.putUserInfo(sub, modify);
    // dispatch({ type: MODIFY_USER, payload: data})
    setLoading && setLoading(false);
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

export const getAllUsersNoAdmin = (page) => async (dispatch) => {
  try {
    const { data } = await api.getAllUsersNoAdmin(page);
    dispatch({ type: GET_ALL_USERS_NOADMIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllAdmins = (page) => async (dispatch) => {
  try {
    const { data } = await api.getAllAdmins(page);
    dispatch({ type: GET_ALL_ADMINS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSearchUsers = (page, search) => async (dispatch) => {
  try {
    const { data } = await api.getSearchUsers(page, search);
    dispatch({ type: GET_SEARCH_USERS, payload: data });
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

export const modifyQuestion = (question, setIsModify, setIsLiked) => async (dispatch) => {
  try {
    const { data } = await api.modifyQuestion(question);
    dispatch({ type: MODIFY_QUESTION, payload: data });
    setIsModify && setIsModify(false);
    setIsLiked && setIsLiked(prevIsLiked => !prevIsLiked)
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteQuestion = (question, setIsModify) => async (dispatch) => {
  try {
    const { data } = await api.deleteQuestion(question);
    dispatch({ type: DELETE_QUESTION, payload: data });
    setIsModify && setIsModify(false);
  } catch (error) {
    console.log(error.message);
  }
};

export const cleanQuestion = () => {
  return {type: CLEAN_QUESTION}
}

export const addFavourites = async (sub, qId, boolean, setIsLiked) => {
  try {
    await api.addFavourites(sub, qId, boolean);
    setIsLiked((prevIsLiked) => !prevIsLiked);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFavourites = (sub, page, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getFavourites(sub, page);
    dispatch({ type: GET_FAVOURITES, payload: data });
    setLoading && setLoading(false)
  } catch (error) {
    console.log(error.message);
  }
};

export const cleanFavourites = () => {
  return {type: CLEAN_FAVOURITES}
}

export const getAllQuestions = (sort, page, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions(sort, page);
    dispatch({ type: GET_ALL_QUESTIONS, payload: data });
    setLoading && setLoading(false)
  } catch (error) {
    console.log(error.message);
  }
};

export const getSearchQuestions = (search, sort, page, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getSearchQuestions(search, sort, page);
    dispatch({ type: GET_SEARCH_QUESTIONS, payload: data });
    setLoading && setLoading(false)
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserQuestions = (sub, sort, page) => async (dispatch) => {
  try {
    const { data } = await api.getUserQuestions(sub, sort, page);
    dispatch({ type: GET_USER_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserQuestionsSearch =
  (sub, answered, page, search) => async (dispatch) => {
    try {
      const { data } = await api.getUserQuestionsSearch(
        sub,
        answered,
        page,
        search
      );
      dispatch({ type: GET_USER_QUESTIONS_ORDERER, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const cleanUserQuestion = () => {
  return {type: CLEAN_USER_QUESTIONS}
}

export const cleanQuestions = () => {
  return {type: CLEAN_QUESTIONS}
}

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

export const putAnswer = (answer, setIsModify) => async (dispatch) => {
  try {
    const { data } = await api.putAnswer(answer);
    dispatch({ type: PUT_ANSWER, payload: data });
    setIsModify && setIsModify(prevState=> !prevState);
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

export const cleanAnswers = () => {
  return {type: CLEAN_ANSWERS}
}


// RUTAS Message/Messages
export const postMessage = (message) => async (dispatch) => {
  try {
    const { data } = await api.postMessage(message);
    dispatch({ type: POST_MESSAGE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllMessages = (page) => async (dispatch) => {
  try {
    const { data } = await api.getAllMessages(page);
    dispatch({ type: GET_ALL_MESSAGES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const putMessage = (message, setMessageFlag) => async (dispatch) => {
  try {
    const { data } = await api.putMessage(message);
    dispatch({ type: PUT_MESSAGE, payload: data });
    setMessageFlag && setMessageFlag(prevFlag => !prevFlag);
  } catch (error) {
    console.log(error.message);
  }
};

// RUTA TAGS

export const getAllTags = () => async (dispatch) => {
  try {
    const { data } = await api.getAllTags();
    dispatch({ type: GET_ALL_TAGS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//RUTAS ALERTS

export const getAllAlerts = (page) => async (dispatch) => {
  try {
    const { data } = await api.getAllAlerts(page);
    dispatch({ type: GET_ALL_ALERTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


// SORT

export const setSort = (sort) => {
  return { type: SET_SORT, payload: sort}
}