import React from 'react'
import Footer from '../components/Footer'
import style from './styles/PagoListo.module.css'

const PagoListo = () => {
  return (
    <div>
        <span>Tu donación fue enviada con suceso</span>
        
        <div className={style.footer}>
          <Footer />
        </div>
    </div>
  )
}

export default PagoListo