import {
  GET_RANKING,
  GET_ALL_USERS,
  GET_ALL_QUESTIONS,
  GET_SEARCH_QUESTIONS,
  GET_USER_QUESTIONS,
  GET_USER_ANSWERS,
  GET_FAVOURITES,
  //GET_TOPTEN_RANKING,
  GET_USER_QUESTIONS_ORDERER,
  GET_ALL_MESSAGES
} from "../actions/actionTypes";

export default function pages(state = [], action) {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.payload.pages;
    case GET_USER_QUESTIONS:
      return action.payload.pages;
    case GET_SEARCH_QUESTIONS:
      return action.payload.pages;
    case GET_USER_ANSWERS:
      return action.payload.pages;
    case GET_FAVOURITES:
      return action.payload.pages;
    case GET_RANKING:
      return action.payload.pages;
    case GET_USER_QUESTIONS_ORDERER:
      return action.payload.pages;
    case GET_ALL_USERS:
      return action.payload.pages;
    case GET_ALL_MESSAGES:
      return action.payload.pages;
    default:
      return state;
  }
}
