import {
    GET_ALL_MESSAGES,
} from "../actions/actionTypes";
      
export default function pages3(state = 0, action) {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return action.payload.pages;
        default:
            return state;
    }
}