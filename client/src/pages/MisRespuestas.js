import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/MisRespuestas.module.css"
import Footer from "../components/Footer.js"


const MisRespuestas = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            {
            isAuthenticated ? (
            <div >
                <Headerlogin />
                {/* Acá el contenido para logueados */}
                <h1>Acá van mis Respuestas</h1>
            </div>
        
            ):
            <div className={style.total}>
                <Header />
                {/* Acá el contenido para no logueados */}
                <h1>Para guardar tus respuestas primero hay que loguearse</h1>
            </div>
            }
        <div><Footer/></div>
        </div>
      
    )
}

export default MisRespuestas