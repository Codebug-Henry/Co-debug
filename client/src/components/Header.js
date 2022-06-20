import { Link } from "react-router-dom"
import logo from "../images/logo_codebug.png"
import React from 'react'
import style from "./styles/Header.module.css"
import Butlog from "./Butlog"


const headerlogout = () => {


  return (
    <div className={style.headerfull}>
        <div>
            <Link to="/">
                <img className={style.logo} src={logo} alt="logo"/>
            </Link>
            
        </div>
        <div className={style.cajaLogReg}>
            <div>
                <Butlog/>
            </div>
        </div>
        
    </div>
  )
}

export default headerlogout