import reducer from "./reducer"                                 // reducer se encarga de filtrar las peticiones de las acciones
import { createStore, applyMiddleware } from "redux"            // creacion del store y funcion que permite aplicar middleware
import thunk from "redux-thunk"                                 // middleware permite hacer peticiones asincronicas
import { composeWithDevTools } from "redux-devtools-extension"  // para que funcione dev tools

const store =createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))

)

export default store;