import { GET_RANKING } from "../actions/actionTypes"

export default function ranking (state = [], action){
    switch(action.type){
        case GET_RANKING:
            return action.payload.results
        default:
            return state            
    }
}