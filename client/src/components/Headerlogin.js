import { Link } from "react-router-dom"
import logo from "../images/logo_codebug.png"
import React from 'react'
import Butlogout from "./Butlogout"
import { useAuth0 } from "@auth0/auth0-react"
import style from "./styles/Headerlogin.module.css"

const Headerlogin = () => {
  const { user } = useAuth0();
  console.log(user)
  return (
    <div className={style.headerfull}>
        <div>
            <Link to="/">
                <img className={style.logo} src={logo} alt="logo"/>
            </Link>
        </div>
        <div className={style.links}>
            <Link to="/" className={style.linksInt}>
              <h5>PRINCIPAL</h5>
            </Link>
            <Link to="/favoritas" className={style.linksInt}>
              <h5>FAVORITOS</h5>
            </Link>
            <Link to="/mispreguntas" className={style.linksInt}>
              <h5>MIS PREGUNTAS</h5>
            </Link>
            <Link to="/misrespuestas" className={style.linksInt}>
              <h5>MIS RESPUESTAS</h5>
            </Link>
            <Link to="/ranking" className={style.linksInt}>
              <h5>RANKING</h5>
            </Link>
            <Link to="/preguntar" className={style.linksInt}>
              <h5>PREGUNTAR</h5>
            </Link>
            <Link to="/admin" className={style.linksInt}>
              <h5>ADMIN</h5>
            </Link>
        </div>
        <div className={style.imgNameLogOut}>
            <Link to="/configuracion" className={style.contImagen}>
              <img className={style.userImage} src={user.picture} alt={user.name}/>
            </Link>
            <Link to="/configuracion" >
              <h3 className={style.name}>{user.name}</h3>
            </Link>
        
            <div className={style.cajaLogReg}>
                    <Butlogout/>
            </div>
        </div>

    </div>
  )
}

export default Headerlogin