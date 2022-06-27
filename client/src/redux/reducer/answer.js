import { PUT_ANSWER, DELETE_ANSWER } from "../actions/actionTypes"

export default function answer (state = {}, action){
    switch(action.type){
        case PUT_ANSWER:
            return action.payload
        case DELETE_ANSWER:
            return {}
        default:
            return state            
    }
}