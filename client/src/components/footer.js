import React from 'react'
import { Link } from 'react-router-dom'
import style from "./styles/Footer.module.css"

const footer = () => {
  return (
    <div className={style.footerTotal}>
        <Link to="/ayuda">
            <h5>Ayuda</h5>
        </Link>
        <Link to="/creadores">
            <h5>Creadores</h5>
        </Link>
        <h5>Todos los derechos re sebados y los torcidos ni te cuento</h5>
    </div>
  )
}

export default footer