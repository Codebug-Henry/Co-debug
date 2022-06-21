import { GET_ALL_QUESTIONS, GET_USER_QUESTIONS } from "../actions/actionTypes"

export default function questions (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload
        case GET_USER_QUESTIONS:
            return action.payload
        default:
            return state            
    }
}