import {
    GET_ALL_USERS,
  } from "../actions/actionTypes";
  
  export default function pages2(state = 0, action) {
    switch (action.type) {
      case GET_ALL_USERS:
        return action.payload.pages;
      default:
        return state;
    }
  }