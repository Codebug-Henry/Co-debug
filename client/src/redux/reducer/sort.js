import { SET_SORT } from "../actions/actionTypes"

export default function sort (state = 'desc', action){
    switch(action.type){
        case SET_SORT:
            return action.payload
        default:
            return state
    }
}