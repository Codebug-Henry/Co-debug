import { GET_ALL_QUESTIONS } from "../actions/actionTypes"

export default function pages (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.pages
        default:
            return state            
    }
}