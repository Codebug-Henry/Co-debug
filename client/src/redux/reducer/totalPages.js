import { GET_ALL_QUESTIONS, GET_SEARCH_QUESTIONS, GET_ALL_QUESTIONS_SORTED, GET_USER_QUESTIONS, GET_USER_ANSWERS, GET_FAVOURITES, GET_TOPTEN_RANKING, GET_USER_QUESTIONS_ORDERER} from "../actions/actionTypes"

export default function totalPages (state = 0, action){
    switch(action.type){
        case GET_ALL_QUESTIONS:
            return action.payload.totalPages
        case GET_USER_QUESTIONS:
         return action.payload.totalPages
        case GET_SEARCH_QUESTIONS:
            return action.payload.totalPages
        case GET_ALL_QUESTIONS_SORTED:
            return action.payload.totalPages
        case GET_USER_ANSWERS:
            return action.payload.totalPages
        case GET_FAVOURITES:
            return action.payload.totalPages
        case GET_TOPTEN_RANKING:
            return action.payload.totalPages
        case GET_USER_QUESTIONS_ORDERER:
            return action.payload.totalPages
        default:
            return state            
    }
}