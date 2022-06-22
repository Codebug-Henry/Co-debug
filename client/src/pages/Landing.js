import React from 'react'
import Header from '../components/Header.js'
import Headerlogin from '../components/Headerlogin.js'
import style from "./styles/Landing.module.css"
import { useAuth0 } from '@auth0/auth0-react'
import Loading from '../components/Loading.js'
import Footer from "../components/Footer.js"



// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
// //Mandar pedido useEffect dispatch mi action >> pedido back >> res new object >

const Landing = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if(isLoading){
    
    return <div>
              <Loading />
           </div>
  }
  
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
        <div>
          <Footer/>
        </div>
    </div>
  )
}

export default Landing