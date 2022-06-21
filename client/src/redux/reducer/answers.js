import { GET_USER_ANSWERS } from "../actions/actionTypes"

export default function answers (state = [], action){
    switch(action.type){
        case GET_USER_ANSWERS:
            return action.payload
        default:
            return state            
    }
}