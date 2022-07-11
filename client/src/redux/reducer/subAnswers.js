import { GET_SUBANSWERS} from "../actions/actionTypes"

export default function subAnswers (state = [], action){
    switch(action.type){
        case GET_SUBANSWERS:
            return action.payload
        default:
            return state            
    }
}