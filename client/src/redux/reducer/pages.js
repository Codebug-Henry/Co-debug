import { GET_ALL_QUESTIONS, GET_SEARCH_QUESTIONS, GET_ALL_QUESTIONS_SORTED, GET_USER_QUESTIONS, GET_USER_ANSWERS, GET_FAVOURITES, GET_TOPTEN_RANKING} from "../actions/actionTypes"

export default function pages (state = [], action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.pages
        case GET_USER_QUESTIONS:
         return action.payload.pages
        case GET_SEARCH_QUESTIONS:
            return action.payload.pages
        case GET_ALL_QUESTIONS_SORTED:
            return action.payload.pages
        case GET_USER_ANSWERS:
            return action.payload.pages
        case GET_FAVOURITES:
            return action.payload.pages
        case GET_TOPTEN_RANKING:
            return action.payload.pages
        default:
            return state            
    }
}