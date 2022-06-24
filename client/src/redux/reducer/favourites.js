import { GET_FAVOURITES } from "../actions/actionTypes"

export default function favourites (state = [], action){
    switch(action.type){
        case GET_FAVOURITES:
            return action.payload.results
        default:
            return state            
    }
}