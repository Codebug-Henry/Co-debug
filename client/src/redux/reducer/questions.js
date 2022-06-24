import { GET_ALL_QUESTIONS, GET_ALL_QUESTIONS_SORTED, GET_SEARCH_QUESTIONS} from "../actions/actionTypes"

export default function questions (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.results
        case GET_ALL_QUESTIONS_SORTED:
            return action.payload
        case GET_SEARCH_QUESTIONS:
            return action.payload.results
        default:
            return state            
    }
}