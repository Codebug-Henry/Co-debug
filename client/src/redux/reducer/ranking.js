import { GET_RANKING, CLEAN_RANKING } from "../actions/actionTypes"

export default function ranking (state = [], action){
    switch(action.type){
        case GET_RANKING:
            return action.payload.results
        case CLEAN_RANKING:
            return []
        default:
            return state            
    }
}