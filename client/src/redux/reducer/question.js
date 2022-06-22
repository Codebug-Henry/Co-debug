import { DELETE_QUESTION, GET_QUESTION, MODIFY_QUESTION } from "../actions/actionTypes"

export default function question (state = {}, action){
    switch(action.type){
        case GET_QUESTION:
            return action.payload
        case MODIFY_QUESTION:
            return action.payload
        case DELETE_QUESTION:
            return {}
        default:
            return state            
    }
}