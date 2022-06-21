import { GET_TOPTEN_RANKING } from "../actions/actionTypes"

export default function topTenRanking (state = [], action){
    switch(action.type){
        case GET_TOPTEN_RANKING:
            return action.payload
        default:
            return state            
    }
}