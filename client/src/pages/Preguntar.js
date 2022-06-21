import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/Preguntar.module.css"
import Footer from "../components/Footer.js"

const Preguntar = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            {
            isAuthenticated ? (
            <div >
                <Headerlogin />
                {/* Acá el contenido para logueados */}
                <h1>Acá voy a poder Preguntar</h1>
            </div>
        
            ):
            <div className={style.total}>
                <Header />
                {/* Acá el contenido para no logueados */}
                <h1>Para poder hacer preguntas primero hay que loguearse</h1>
            </div>
            }
        <div><Footer/></div>
        </div>
      
    )
}

export default Preguntar