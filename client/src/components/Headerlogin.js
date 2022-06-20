import { Link } from "react-router-dom"
import logo from "../images/logo_codebug.png"
import React from 'react'
import Butlogout from "./Butlogout"
import { useAuth0 } from "@auth0/auth0-react"
import style from "./styles/Headerlogin.module.css"

const Headerlogin = () => {
  const { user } = useAuth0();

  return (
    <div className={style.headerfull}>
        <div>
            <Link to="/">
                <img className={style.logo} src={logo} alt="logo"/>
            </Link>
            
        </div>
        <div>
            <div className={style.imagenYNombre}>
                <div >
                  <img className={style.userImage} src={user.picture} alt={user.name}/>
                </div>
                <div className={style.nombre}>
                  <h4>{user.name}</h4>
                </div>
            </div>
            <div className={style.cajaLogReg}>
                <div>
                    <Butlogout/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Headerlogin