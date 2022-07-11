import { SET_MICROTAG } from "../actions/actionTypes"

export default function filterMicrotag (state = 'All', action){
    switch(action.type){
        case SET_MICROTAG:
            return action.payload
        default:
            return state
    }
}