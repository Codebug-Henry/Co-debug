import { SET_SORTVALIDATE } from "../actions/actionTypes"

export default function sortValidate (state = 'All', action){
    switch(action.type){
        case SET_SORTVALIDATE:
            return action.payload
        default:
            return state
    }
}