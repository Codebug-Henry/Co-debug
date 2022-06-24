import { GET_ALL_QUESTIONS, GET_SEARCH_QUESTIONS, GET_ALL_QUESTIONS_SORTED } from "../actions/actionTypes"

export default function pages (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.pages
        case GET_SEARCH_QUESTIONS:
            return action.payload.pages
        case GET_ALL_QUESTIONS_SORTED:
            return action.payload.pages
        default:
            return state            
    }
}