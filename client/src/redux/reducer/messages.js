import { GET_ALL_MESSAGES } from "../actions/actionTypes";

export default function messages(state = [], action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return action.payload.results;
    default:
      return state;
  }
}
