import {GET_ALL_USERS_NOADMIN, GET_SEARCH_USERS} from "../actions/actionTypes"

export default function usersNoAdmin (state = [], action){
    switch(action.type){
        case  GET_ALL_USERS_NOADMIN:
            return action.payload.results;
        case GET_SEARCH_USERS:
            return action.payload.results;
        default:
            return state            
    }
}