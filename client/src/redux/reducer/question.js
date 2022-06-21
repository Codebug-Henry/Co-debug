import { GET_QUESTION } from "../actions/actionTypes"

export default function question (state = {}, action){
    switch(action.type){
        case GET_QUESTION:
            return action.payload
        default:
            return state            
    }
}