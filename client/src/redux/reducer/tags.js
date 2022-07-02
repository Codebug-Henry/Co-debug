import { GET_ALL_TAGS } from "../actions/actionTypes"

export default function tags (state = [], action){
    switch(action.type){
        case GET_ALL_TAGS:
            return action.payload
        default:
            return state            
    }
}