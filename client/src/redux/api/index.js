import axios from 'axios';
const URL = 'http://localhost:3001'

// Pagina Principal
export const sendUserInfo = (user) => axios.post(`${URL}/user`, user);
export const getTopTenRanking = () => axios.get(`${URL}/users/topTen`);
// export const filterByResponded = (sort) => axios.get(`${URL}/r`)

// Pagina por ID Pregunta
export const getQuestion = (id) => axios.get(`${URL}/question/${id}`)
export const sendResponse = (response) => axios.post(`${URL}/answer`, response);

// Favoritos

export const addFavourites = (sub, qId, boolean) => axios.put(`${URL}/questions/favourites?subUser=${sub}&idQuestion=${qId}&add=${boolean}`);
export const getFavourites = (sub) => axios.get(`${URL}/questions/favourites/${sub}`)