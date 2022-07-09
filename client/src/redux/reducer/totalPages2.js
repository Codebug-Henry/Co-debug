import {
    GET_ALL_USERS,
  } from "../actions/actionTypes";
  
  export default function totalPages2(state = 0, action) {
    switch (action.type) {
      case GET_ALL_USERS:
        return action.payload.totalPages;
      default:
        return state;
    }
  }