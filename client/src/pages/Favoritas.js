import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/Favoritas.module.css"

const Favoritas = () => {
    const { isAuthenticated } = useAuth0();
    return (
     
      isAuthenticated ? (
      <div >
          <Headerlogin />
          {/* Acá el contenido para logueados */}
          <h1>Acá van los favoritos</h1>
      </div>
  
      ):
      <div className={style.total}>
          <Header />
          {/* Acá el contenido para no logueados */}
          <h1>Para tener contenido favorito primero hay que loguearse</h1>
      </div>
      
    )
}

export default Favoritas