import React from 'react'
import Paypal from '../components/Paypal'
import { useState } from 'react';
import Footer from '../components/Footer.js';
import style from './styles/PaypalPage.module.css'
import supportdevelopers from '../images/supportdevelopers.png'
import paypal from '../images/paypal2.png'

const PaypalPage = () => {

  const [ val, setVal ] = useState(1)
  const [ checkout, setCheckOut ] = useState(false);

  return (
    
    
    <div>
     { checkout ? (
        <div>
          <div className={style.BigPaypalOne}>
        <div className={style.tituloYTexto}>
          <p className={style.titulo}>
            Invirtiendo en Mejoras
          </p>
          <p>
            Primeramente queremos agradecerte por considerar ayudar en nuestro proyecto. Nos parece justo contarte un poco para que será utilizada tu donación.
            Este es un proyecto totalmente gratuito para todo usuario que lo necesite. Independientemente de eso, las mejoras y desarrollo de esta herramienta conlleva muchas horas de trabajo.
            Queremos poder invertir ese tiempo y el dinero que nos facilitas para poder mejorar todos los aspectos de este sitio.
            Desde ya estamos agradecidos por tenerte en esta sección.


          </p>
        </div>


          <div className={style.BoxPaypalOne}>
            <Paypal val={val}/>
          </div>

        <div className={style.sdevelopers}>
          <img src={supportdevelopers}></img>
        </div>
      </div>
        </div>

          



      ) : (

      <div className={style.BigPaypalOne}>
        <div className={style.tituloYTexto}>
          <p className={style.titulo}>
            Invirtiendo en Mejoras
          </p>
          <p>
            Primeramente queremos agradecerte por considerar ayudar en nuestro proyecto. Nos parece justo contarte un poco para que será utilizada tu donación.
            Este es un proyecto totalmente gratuito para todo usuario que lo necesite. Independientemente de eso, las mejoras y desarrollo de esta herramienta conlleva muchas horas de trabajo.
            Queremos poder invertir ese tiempo y el dinero que nos facilitas para poder mejorar todos los aspectos de este sitio.
            Desde ya estamos agradecidos por tenerte en esta sección.


          </p>
        </div>


          <div className={style.BoxPaypalOne}>
            <div className={style.paypalArea}>
              <p>Powered By</p>
              <img className={style.paypalLogo} src={paypal}/>
            </div>
            <div className={style.setValor}>
              <p className={style.plata}>R$ </p>
              <input className={style.input} onChange={(e)=>setVal(parseInt(e.target.value))} ></input>
              <button onClick={()=> setCheckOut(true)}>Donar</button>
            </div>
          </div>

        <div className={style.sdevelopers}>
          <img src={supportdevelopers}></img>
        </div>
      </div>

        ) 
      }
      <div className={style.footer}>
        <Footer />
      </div>
      
    </div>


  );
}

export default PaypalPage