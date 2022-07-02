import { GET_USER_INFO, MODIFY_USER, DELETE_USER } from "../actions/actionTypes"

export default function user (state = {}, action){
    switch(action.type){
        case GET_USER_INFO:
            return action.payload
        case DELETE_USER:
            return {}
        case MODIFY_USER:
            return action.payload
        default:
            return state            
    }
}