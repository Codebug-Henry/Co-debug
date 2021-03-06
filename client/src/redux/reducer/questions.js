import { GET_ALL_QUESTIONS, GET_SEARCH_QUESTIONS, CLEAN_QUESTIONS} from "../actions/actionTypes"

export default function questions (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.results
        case GET_SEARCH_QUESTIONS:
            return action.payload.results
        case CLEAN_QUESTIONS:
            return []
        default:
            return state            
    }
}