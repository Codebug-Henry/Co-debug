import { GET_NOTIFICATIONS} from "../actions/actionTypes"

export default function notifications (state = {}, action){
    switch(action.type){
        case GET_NOTIFICATIONS:
            return action.payload
        default:
            return state            
    }
}