import {
  GET_ALL_ALERTS,
  GET_SEARCH_USERS,
  //GET_ALL_ADMINS,
  GET_ALL_QUESTIONS,
  GET_SEARCH_QUESTIONS,
  GET_ALL_QUESTIONS_SORTED,
  GET_USER_QUESTIONS,
  GET_USER_ANSWERS,
  GET_FAVOURITES,
  GET_USER_QUESTIONS_ORDERER,
  GET_RANKING,
  GET_QUESTION,
  GET_ALL_USERS,
  GET_ALL_MESSAGES,
  GET_ALL_USERS_NOADMIN,
} from "../actions/actionTypes";

export default function totalPages(state = 0, action) {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.payload.totalPages;
    case GET_USER_QUESTIONS:
      return action.payload.totalPages;
    case GET_SEARCH_QUESTIONS:
      return action.payload.totalPages;
    case GET_ALL_QUESTIONS_SORTED:
      return action.payload.totalPages;
    case GET_USER_ANSWERS:
      return action.payload.totalPages;
    case GET_FAVOURITES:
      return action.payload.totalPages;
    case GET_USER_QUESTIONS_ORDERER:
      return action.payload.totalPages;
    // case GET_ALL_ADMINS:
    // return action.payload.totalPages;
    case GET_SEARCH_USERS:
      return action.payload.totalPages;
    case GET_ALL_ALERTS:
      return action.payload.totalPages;
    case GET_RANKING:
      return action.payload.totalPages;
    case GET_QUESTION:
      return action.payload.answers.totalPages;
    case GET_ALL_USERS:
      return action.payload.totalPages;
    case GET_ALL_MESSAGES:
      return action.payload.totalPages;
    case GET_ALL_USERS_NOADMIN:
      return action.payload.totalPages;
    default:
      return state;
  }
}
