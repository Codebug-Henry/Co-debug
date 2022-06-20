import React from 'react'
import style from "./styles/Butlog.module.css"
import { useAuth0 } from "@auth0/auth0-react";

const Butlog = () => {
    const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={()=> loginWithRedirect()} className={style.buttonLogin}>Log in/Register</button>
  )
}

export default Butlog