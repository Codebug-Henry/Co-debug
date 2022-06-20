import React from 'react'
import Header from '../components/Header.js'
import style from "./styles/Landing.module.css"
import { useAuth0 } from '@auth0/auth0-react'
import Headerlogin from '../components/Headerlogin.js'


const Landing = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
   
    isAuthenticated ? (
    <div >
        <Headerlogin />
    </div>
    ):
    <div className={style.total}>
        <Header />
    </div>
    
  )
}

export default Landing