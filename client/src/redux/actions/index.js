import { SEND_USER_INFO, GET_TOPTEN_RANKING, GET_USER_INFO, MODIFY_USER, DELETE_USER, SEND_QUESTION, MODIFY_QUESTION, DELETE_QUESTION, GET_RANKING, GET_QUESTION, SEND_RESPONSE, GET_FAVOURITES, GET_ALL_QUESTIONS, GET_USER_QUESTIONS, PUT_ANSWER, DELETE_ANSWER, GET_USER_ANSWERS } from './actionTypes'
import * as api from '../api'

// RUTAS user - users
export const sendUserInfo = (user) => async (dispatch) => {
    try {
        const { data } = await api.sendUserInfo(user)
        // dispatch({ type: SEND_USER_INFO, payload: data })
    } catch (error) {
        console.log(error.message)
    }    
}

export const getTopTenRanking = () => async (dispatch) => {
    try {
        const { data } = await api.getTopTenRanking()
        dispatch({ type: GET_TOPTEN_RANKING, payload: data})
    } catch (error) {
        console.log(error.message)
    }    
}

export const getRanking = () => async (dispatch) => {
    try {
        const { data } = await api.getRanking()
        dispatch({ type: GET_TOPTEN_RANKING, payload: data})
    } catch (error) {
        console.log(error.message)
    }    
}

export const getUserInfo = (sub) => async (dispatch) => {
    try {
        const { data } = await api.getUserInfo(sub)
        dispatch({ type: GET_USER_INFO, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const putUserInfo = (sub, modify) => async (dispatch) => {
    try {
        await api.putUserInfo(sub, modify)
        // dispatch({ type: MODIFY_USER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteUser = (sub) => async (dispatch) => {
    try {
        const { data } = await api.deleteUser(sub)
        dispatch({ type: DELETE_USER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

// RUTAS question - questions

export const sendQuestion = async (question) => {
    try {
        await api.sendQuestion(question)
    } catch (error) {
        console.log(error.message)
    }
}

export const getQuestion = (id) => async (dispatch) => {
    try {
        const { data } = await api.getQuestion(id)
        dispatch({ type: GET_QUESTION, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const modifyQuestion = async (question) => {
    try {
        const { data } = await api.modifyQuestion(question)
        dispatch({ type: MODIFY_QUESTION, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteQuestion(id)
        dispatch({ type: DELETE_QUESTION, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addFavourites = async (sub, qId, boolean)  => {
    try {
        await api.addFavourites(sub, qId, boolean)        
    } catch (error) {
        console.log(error.message)
    }
}

export const getFavourites = (sub) => async (dispatch) => {
    try {
        const { data } = await api.getFavourites(sub)
        dispatch({ type: GET_FAVOURITES, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getAllQuestions = (search, sort) => async (dispatch) => {
    try {
        const { data } = await api.getAllQuestions(search, sort)
        dispatch({ type: GET_ALL_QUESTIONS, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserQuestions = (sub) => async (dispatch) => {
    try {
        const { data } = await api.getUserQuestions(sub)
        dispatch({ type: GET_USER_QUESTIONS, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

// RUTAS ANSWER

export const sendAnswer = async (answer) => {
    try {
        await api.sendAnswer(answer)
    } catch (error) {
        console.log(error.message)
    }
}

export const putAnswer = (answer) => async (dispatch) => {
    try {
        const { data } = await api.putAnswer(answer)
        dispatch({ type: PUT_ANSWER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteAnswer = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(id)
        dispatch({ type: DELETE_ANSWER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserAnswers = (sub) => async (dispatch) => {
    try {
        const { data } = await api.getUserAnswers(sub)
        dispatch({ type: GET_USER_ANSWERS, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}