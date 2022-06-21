import rootReducer from './reducer'                           // reducer se encarga de filtrar las peticiones de las acciones
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: rootReducer })

export default store;