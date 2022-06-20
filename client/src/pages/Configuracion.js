import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/Configuracion.module.css"



const Configuracion = () => {
    const { isAuthenticated } = useAuth0();
    return (
     
      isAuthenticated ? (
      <div >
          <Headerlogin />
          {/* Acá el contenido para logueados */}
          <h1>Cambios en tu configuracion aquí</h1>
      </div>
  
      ):
      <div className={style.total}>
          <Header />
          {/* Acá el contenido para no logueados */}
          <h1>Usted no está logueado como para generar cambios</h1>
      </div>
      
    )
}

export default Configuracion