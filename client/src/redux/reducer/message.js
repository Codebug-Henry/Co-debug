import { POST_MESSAGE } from "../actions/actionTypes";

export default function message(state = {}, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
