import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/Ayuda.module.css"

const Ayuda = () => {
    const { isAuthenticated } = useAuth0();
    return (
     
      isAuthenticated ? (
      <div >
          <Headerlogin />
          {/* Acá el contenido para logueados */}
          <h1>Acá van la Ayuda</h1>
      </div>
  
      ):
      <div className={style.total}>
          <Header />
          {/* Acá el contenido para no logueados (en este caso lo mismo) */}
          <h1>Acá van la Ayuda</h1>
      </div>
      
    )
}

export default Ayuda