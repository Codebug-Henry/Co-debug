import {GET_ALL_ALERTS} from "../actions/actionTypes"

export default function alerts (state = {}, action){
    switch(action.type){
        case GET_ALL_ALERTS:
            return action.payload.results
        default:
            return state            
    }
}