import { POST_MESSAGE, PUT_MESSAGE } from "../actions/actionTypes";

export default function message(state = {}, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return action.payload;
    case PUT_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
