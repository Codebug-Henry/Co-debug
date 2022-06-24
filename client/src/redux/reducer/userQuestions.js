import {GET_USER_QUESTIONS, GET_USER_QUESTIONS_ORDERER } from "../actions/actionTypes"

export default function userQuestions (state = {}, action){
    switch(action.type){
        case GET_USER_QUESTIONS:
            return action.payload.results
        case GET_USER_QUESTIONS_ORDERER:
            return action.payload.results
        default:
            return state            
    }
}