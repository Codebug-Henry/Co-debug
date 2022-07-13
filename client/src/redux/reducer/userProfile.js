import { GET_USER_INFO2 } from "../actions/actionTypes"

export default function userProfile (state = {}, action){
    switch(action.type){
        case GET_USER_INFO2:
            return action.payload
        default:
            return state            
    }
}