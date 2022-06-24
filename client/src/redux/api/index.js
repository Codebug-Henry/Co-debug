import axios from 'axios';
const URL = 'http://localhost:3001'

// RUTAS user - users
export const sendUserInfo = (user) => axios.post(`${URL}/user`, user);
export const getTopTenRanking = () => axios.get(`${URL}/users/topTen`);
export const getRanking = (sort, page) => axios.get(`${URL}/users?sort=${sort}&page=${page}&limit=10`)
export const getUserInfo = (sub) => axios.get(`${URL}/user/${sub}`)
export const putUserInfo = (sub, modify) => axios.put(`${URL}/user/${sub}`, modify)
export const deleteUser = (sub) => axios.delete(`${URL}/user/${sub}`)

// RUTAS question - questions
export const sendQuestion = (question) => axios.post(`${URL}/question`, question);
export const getQuestion = (id) => axios.get(`${URL}/question/${id}`)
export const modifyQuestion = (modify) => axios.put(`${URL}/question`, modify)
export const deleteQuestion = (id) => axios.delete(`${URL}/question/${id}`)
export const addFavourites = (sub, qId, boolean) => axios.put(`${URL}/questions/favourites?sub=${sub}&id=${qId}&add=${boolean}`);
export const getFavourites = (sub, page) => axios.get(`${URL}/questions/favourites/${sub}?limit=5&page=${page}`)
export const getAllQuestions = (page) => axios.get(`${URL}/questions?page=${page}&limit=5`);
export const getAllQuestionsSorted = (sort, page) => axios.get(`${URL}/questions?sort=${sort}&page=${page}&limit=5`);
export const getSearchQuestions = (search, page) => axios.get(`${URL}/questions?search=${search}&page=${page}&limit=5`);
export const getUserQuestions = (sub, page) => axios.get(`${URL}/questions/${sub}?page=${page}&limit=5`)
export const getUserQuestionsOrderer = (sub, answered, page) => axios.get(`${URL}/questions/${sub}?answered=${answered}&page=${page}&limit=5`) // answered puede ser true o false

// RUTAS ANSWER
export const sendAnswer = (answer) => axios.post(`${URL}/answer`, answer);
export const putAnswer = (answer) => axios.put(`${URL}/answer`, answer);
export const deleteAnswer = (id) => axios.delete(`${URL}/answer/${id}`)
export const getUserAnswers = (sub, page) => axios.get(`${URL}/answers/${sub}?page=${page}&limit=5`)