import axios from "axios";

// RUTAS user - users
export const sendUserInfo = (user) => axios.post(`/user`, user);
export const getTopTenRanking = () => axios.get(`/users/topTen`);
export const getRanking = (sort, page) =>
  axios.get(`/users?sort=${sort}&page=${page}&limit=5`);
export const getUserInfo = (sub) => axios.get(`/user/${sub}`);
export const putUserInfo = (sub, modify) => axios.put(`/user/${sub}`, modify);
export const getAllUsers = (page) =>
  axios.get(`/users?sort=asc&page=${page}&limit=16&admin=true`);
export const deleteUser = (sub, status) => axios.put(`/user/${sub}`, status);

// RUTAS question - questions
export const sendQuestion = (question) => axios.post(`/question`, question);
export const getQuestion = (id) => axios.get(`/question/${id}`);
export const modifyQuestion = (modify) => axios.put(`/question`, modify);
export const deleteQuestion = (question) => axios.put(`/question`, question);
export const addFavourites = (sub, qId, boolean) =>
  axios.put(`/questions/favourites?sub=${sub}&id=${qId}&add=${boolean}`);
export const getFavourites = (sub, page) =>
  axios.get(`/questions/favourites/${sub}?limit=5&page=${page}`);
export const getAllQuestions = (page) =>
  axios.get(`/questions?page=${page}&limit=5`);
export const getAllQuestionsSorted = (sort, page) =>
  axios.get(`/questions?sort=${sort}&page=${page}&limit=5`);
export const getSearchQuestions = (search, page) =>
  axios.get(`/questions?search=${search}&page=${page}&limit=5`);
export const getUserQuestions = (sub, page, search) =>
  axios.get(`/questions/${sub}?page=${page}&search=${search}&limit=5`);
export const getUserQuestionsOrderer = (sub, answered, page) =>
  axios.get(`/questions/${sub}?answered=${answered}&page=${page}&limit=5`); // answered puede ser true o false

// RUTAS ANSWER
export const sendAnswer = (answer) => axios.post(`/answer`, answer);
export const putAnswer = (answer) => axios.put(`/answer`, answer);
export const deleteAnswer = (deleted) => axios.put(`/answer`, deleted);
export const getUserAnswers = (sub, page) =>
  axios.get(`/answers/${sub}?page=${page}&limit=5`);

// RUTAS Message / Messages
export const putMessage = (message) => axios.put(`/message`, message);
export const getAllMessages = (sub, page) =>
  axios.get(`/messages/${sub}?page=${page}&limit=5`);
