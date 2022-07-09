import React from "react";
import Paypal from "../components/Paypal";
import { useState } from "react";
import Footer from "../components/Footer.js";
import style from "./styles/PaypalPage.module.css";
// import supportdevelopers from '../images/supportdevelopers.png'
// import paypal from '../images/paypal2.png'

const PaypalPage = () => {
  const [val, setVal] = useState(1);
  const [checkout, setCheckOut] = useState(false);
  const [ mensaje, setMensaje ] = useState("")


  const handleValor = (e) => {
    setVal(Number(e.target.value))
  }

  const handleBoton = () => {
    val >= 1? setCheckOut(true): setMensaje("El mínimo es 1")
  }

  return (
    <div>
      {checkout ? (
        <div className={style.container}>
          <div className={style.tandt}>
            <div className={style.col}>
              <p className={style.title}>Invirtiendo en Mejoras</p>
              <p className={style.text}>
                Primeramente queremos agradecerte por considerar ayudar en
                nuestro proyecto. Nos parece justo contarte un poco para que
                será utilizada tu donación. Este es un proyecto totalmente
                gratuito para todo usuario que lo necesite. Independientemente
                de eso, las mejoras y desarrollo de esta herramienta conlleva
                muchas horas de trabajo. Queremos poder invertir ese tiempo y el
                dinero que nos facilitas para poder mejorar todos los aspectos
                de este sitio. Desde ya estamos agradecidos por tenerte en esta
                sección.
              </p>
              <div className={style.paypalbox}>
                <Paypal val={val} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.tandt}>
            <div className={style.col}>
              <p className={style.title}>Invirtiendo en Mejoras</p>
              <p className={style.text}>
                Primeramente queremos agradecerte por considerar ayudar en
                nuestro proyecto. Nos parece justo contarte un poco para que
                será utilizada tu donación. Este es un proyecto totalmente
                gratuito para todo usuario que lo necesite. Independientemente
                de eso, las mejoras y desarrollo de esta herramienta conlleva
                muchas horas de trabajo. Queremos poder invertir ese tiempo y el
                dinero que nos facilitas para poder mejorar todos los aspectos
                de este sitio. Desde ya estamos agradecidos por tenerte en esta
                sección.
              </p>

              {/* <p>Powered By</p> */}

              <div className={style.extra}>
                <p className={style.currency}>R$ </p>
                <input
                type="number"
                  onChange={(e)=>handleValor(e)}
                  className={style.input}
                ></input>
                <p className={style.advertencia}>{mensaje}</p>
                <button
                  className={style.button}
                  onClick={()=>handleBoton()}
                >
                  Donar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default PaypalPage;
