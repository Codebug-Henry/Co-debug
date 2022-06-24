import { GET_ALL_QUESTIONS, GET_USER_QUESTIONS, GET_ALL_QUESTIONS_SORTED, GET_SEARCH_QUESTIONS, GET_USER_QUESTIONS_ORDERER } from "../actions/actionTypes"

export default function questions (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload
        case GET_ALL_QUESTIONS_SORTED:
            return action.payload
        case GET_USER_QUESTIONS:
            return action.payload
        case GET_USER_QUESTIONS_ORDERER:
            return action.payload
        case GET_SEARCH_QUESTIONS:
            return action.payload
        default:
            return state            
    }
}