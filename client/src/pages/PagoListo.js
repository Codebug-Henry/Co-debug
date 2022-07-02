import React from 'react'
import Footer from '../components/Footer'
import style from './styles/PagoListo.module.css'

const PagoListo = () => {
  return (
    <div className={style.totalPagoListo}>

        <div className={style.titulo}>
          <span>Gracias!</span>
        </div>
        <div className={style.texto}>
          <span>Tu donación fue enviada con suceso</span>
        </div>

        <div className={style.footer}>
          <Footer />
        </div>
    </div>
  )
}

export default PagoListo