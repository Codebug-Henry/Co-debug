import axios from 'axios';
const URL = 'http://localhost:3001'

// RUTAS user - users
export const sendUserInfo = (user) => axios.post(`${URL}/user`, user);
export const getTopTenRanking = () => axios.get(`${URL}/users/topTen`);
export const getRanking = (sort) => axios.get(`${URL}/users?sort=${sort}`)
export const getUserInfo = (sub) => axios.get(`${URL}/user/${sub}`)
export const putUserInfo = (sub, modify) => axios.put(`${URL}/user/${sub}`, modify)
export const deleteUser = (sub) => axios.delete(`${URL}/user/${sub}`)

// RUTAS question - questions
export const sendQuestion = (question) => axios.post(`${URL}/question`, question);
export const getQuestion = (id) => axios.get(`${URL}/question/${id}`)
export const modifyQuestion = (modify) => axios.put(`${URL}/question`, modify)
export const deleteQuestion = (id) => axios.delete(`${URL}/question/${id}`)
export const addFavourites = (sub, qId, boolean) => axios.put(`${URL}/questions/favourites?sub=${sub}&id=${qId}&add=${boolean}`);
export const getFavourites = (sub) => axios.get(`${URL}/questions/favourites/${sub}`)
export const getAllQuestions = (search, sort) => axios.get(`${URL}/questions?search=${search}&sort=${sort}`);
// export const getAllQuestions = (search, sort) => axios.get(`${URL}/questions`);
export const getUserQuestions = (sub) => axios.get(`${URL}/questions/${sub}`)

// RUTAS ANSWER
export const sendAnswer = (answer) => axios.post(`${URL}/answer`, answer);
export const putAnswer = (answer) => axios.put(`${URL}/answer`, answer);
export const deleteAnswer = (id) => axios.delete(`${URL}/answer/${id}`)
export const getUserAnswers = (sub) => axios.get(`${URL}/answers/${sub}`)