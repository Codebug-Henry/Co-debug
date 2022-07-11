import { SET_MACROTAG } from "../actions/actionTypes"

export default function filterMacrotag (state = 'JavaScript', action){
    switch(action.type){
        case SET_MACROTAG:
            return action.payload
        default:
            return state
    }
}