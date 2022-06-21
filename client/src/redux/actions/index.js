import { SEND_USER_INFO, GET_TOPTEN_RANKING, GET_QUESTION, SEND_RESPONSE, ADD_FAVOURITES, GET_FAVOURITES } from './actionTypes'
import * as api from '../api'

// Pagina Principal
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

// Pagina por ID Pregunta

export const getQuestion = (id) => async (dispatch) => {
    try {
        const { data } = await api.getQuestion(id)
        dispatch({ type: GET_QUESTION, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const sendResponse = async (response) => {
    try {
        await api.sendResponse(response)
    } catch (error) {
        console.log(error.message)
    }
}

// Favoritos