import { TOGGLE_DARKMODE } from "../actions/actionTypes"

export default function answers (state = false, action){
    switch(action.type){
        case TOGGLE_DARKMODE:
            return !state
        default:
            return state            
    }
}