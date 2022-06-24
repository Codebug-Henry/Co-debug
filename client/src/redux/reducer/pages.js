import { GET_ALL_QUESTIONS, GET_USER_QUESTIONS } from "../actions/actionTypes"

export default function pages (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.pages
        case GET_USER_QUESTIONS:
            return action.payload.pages
        default:
            return state            
    }
}