import { GET_FAVOURITES, CLEAN_FAVOURITES } from "../actions/actionTypes"

export default function favourites (state = [], action){
    switch(action.type){
        case GET_FAVOURITES:
            return action.payload.results
        case CLEAN_FAVOURITES:
            return []
        default:
            return state            
    }
}