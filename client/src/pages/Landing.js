import React from 'react'
import Header from '../components/Header.js'
import Headerlogin from '../components/Headerlogin.js'
import style from "./styles/Landing.module.css"
import { useAuth0 } from '@auth0/auth0-react'
import Footer from "../components/Footer.js"


const Landing = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {
        isAuthenticated ? (
        <div >
            <Headerlogin />
            {/* Acá el contenido para logueados */}
            <h1>Página principal logueado</h1>
        </div>

        ):
        <div className={style.total}>
            <Header />
            {/* Acá el contenido para no logueados */}
            <h1>Página principal no logueado</h1>
        </div>
      }
        <div><Footer/></div>
    </div>
  )
}

export default Landing