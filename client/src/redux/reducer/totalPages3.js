import {
    GET_ALL_MESSAGES,
} from "../actions/actionTypes";
      
export default function totalPages3(state = 0, action) {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return action.payload.totalPages;
        default:
            return state;
    }
}