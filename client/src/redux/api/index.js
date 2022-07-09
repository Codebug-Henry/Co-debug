import axios from "axios";

// RUTAS user - users
export const sendUserInfo = (user) => axios.post(`/user`, user);
export const getTopTenRanking = () => axios.get(`/users/topTen`);
export const getRanking = (sort, page) =>
  axios.get(`/users?sort=${sort}&page=${page}&limit=10`);
export const getUserInfo = (sub) => axios.get(`/user/${sub}`);
export const putUserInfo = (sub, modify) => axios.put(`/user/${sub}`, modify);
export const getAllUsers = (page) =>
  axios.get(`/users?sort=name-asc&page=${page}&limit=16&all=true`);
export const getAllUsersNoAdmin = (page) =>
  axios.get(`/users?sort=name-asc&page=${page}&limit=16&admin=false`);
export const deleteUser = (sub, status) => axios.put(`/user/${sub}`, status);
export const getAllAdmins = (page) =>
  axios.get(`/users?sort=name-asc&page=${page}&limit=16&admin=true`);
export const getSearchUsers = (page, search) =>
  axios.get(
    `/users?sort=name-asc&page=${page}&limit=10&search=${search}&admin=false`
  );

// RUTAS question - questions
export const sendQuestion = (question) => axios.post(`/question`, question);
export const getQuestion = (id, page) => axios.get(`/question/${id}?page=${page}&limit=5`);
export const modifyQuestion = (modify) => axios.put(`/question`, modify);
export const deleteQuestion = (question) => axios.put(`/question`, question);
export const addFavourites = (sub, qId, boolean) =>
  axios.put(`/questions/favourites?sub=${sub}&id=${qId}&add=${boolean}`);
export const getFavourites = (sub, page) =>
  axios.get(`/questions/favourites/${sub}?limit=5&page=${page}`);
export const getAllQuestions = (sort, page, validated) =>
  axios.get(`/questions?sort=${sort}&page=${page}&validated=${validated}&limit=5`);
export const getSearchQuestions = (search, sort, page, validated) =>
  axios.get(`/questions?search=${search}&sort=${sort}&page=${page}&validated=${validated}&limit=5`);
export const getUserQuestions = (sub, sort, page) => axios.get(`/questions/${sub}?answered=${sort}&page=${page}&limit=5`);
export const getUserQuestionsSearch = (sub, sort, page, search) => axios.get(`/questions/${sub}?answered=${sort}&page=${page}&search=${search}&limit=5`); // answered puede ser true o false

// RUTAS ANSWER
export const sendAnswer = (answer) => axios.post(`/answer`, answer);
export const putAnswer = (answer) => axios.put(`/answer`, answer);

export const deleteAnswer = (deleted) => axios.put(`/answer`, deleted);
export const getUserAnswers = (sub, page) =>
  axios.get(`/answers/${sub}?page=${page}&limit=5`);

// RUTAS Message / Messages
export const postMessage = (message) => axios.post(`/message`, message);
export const putMessage = (message) => axios.put(`/message`, message);
export const getAllMessages = (page) =>
  axios.get(`/messages?page=${page}&limit=3&answered=false`);

// RUTA TAGS
export const getAllTags = () => axios.get(`/tags`);

//RUTAS ALERTS

export const getAllAlerts = (page)=> axios.get(`/alerts?page=${page}&limit=3&resolved=false`)

//RUTAS NOTIFICATIONS

export const getNotifications = (sub) => axios.get(`/notifications/${sub}`);
export const putNotification = (notification) => axios.put(`/message`, notification);