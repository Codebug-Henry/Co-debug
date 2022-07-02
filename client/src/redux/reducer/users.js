import { GET_ALL_USERS} from "../actions/actionTypes"

export default function users (state = {}, action){
    switch(action.type){
        case GET_ALL_USERS:
            return action.payload.results;
        default:
            return state            
    }
}