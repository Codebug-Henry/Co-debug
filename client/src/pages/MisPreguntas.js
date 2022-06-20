import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/MisPreguntas.module.css"


const MisPreguntas = () => {
    const { isAuthenticated } = useAuth0();
    return (
     
      isAuthenticated ? (
      <div >
          <Headerlogin />
          {/* Acá el contenido para logueados */}
          <h1>Acá van mis Preguntas</h1>
      </div>
  
      ):
      <div className={style.total}>
          <Header />
          {/* Acá el contenido para no logueados */}
          <h1>Para guardar tus preguntas primero hay que loguearse</h1>
      </div>
      
    )
}

export default MisPreguntas