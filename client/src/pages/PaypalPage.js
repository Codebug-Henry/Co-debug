import React from "react";
// import Paypal from '../components/Paypal'
import { useState } from "react";
import Footer from "../components/Footer.js";
import style from "./styles/PaypalPage.module.css";
import supportdevelopers from "../images/supportdevelopers.png";
import paypal from "../images/paypal2.png";

const PaypalPage = () => {
  const [val, setVal] = useState(1);
  const [checkout, setCheckOut] = useState(false);

  return (
    <div>

     { checkout ? (
        <div>
          <div >
            <div >
              <p >
                Invirtiendo en Mejoras
              </p>
              <p>
                Primeramente queremos agradecerte por considerar ayudar en nuestro proyecto. Nos parece justo contarte un poco para que será utilizada tu donación.
                Este es un proyecto totalmente gratuito para todo usuario que lo necesite. Independientemente de eso, las mejoras y desarrollo de esta herramienta conlleva muchas horas de trabajo.
                Queremos poder invertir ese tiempo y el dinero que nos facilitas para poder mejorar todos los aspectos de este sitio.
                Desde ya estamos agradecidos por tenerte en esta sección.


              </p>
            </div>

            <div>
              <Paypal val={val}/>
            </div>

            <div>
            <img></img>
          </div>
        </div>
      </div>

          
      ) : (

      <div >
        <div>
          <p>
            Invirtiendo en Mejoras
          </p>

          <p>
            Primeramente queremos agradecerte por considerar ayudar en nuestro
            proyecto. Nos parece justo contarte un poco para que será utilizada
            tu donación. Este es un proyecto totalmente gratuito para todo
            usuario que lo necesite. Independientemente de eso, las mejoras y
            desarrollo de esta herramienta conlleva muchas horas de trabajo.
            Queremos poder invertir ese tiempo y el dinero que nos facilitas
            para poder mejorar todos los aspectos de este sitio. Desde ya
            estamos agradecidos por tenerte en esta sección.
          </p>
        </div>
        <div >
          <div>
            <p>Powered By</p>

            <img/>
          </div>
          <div>
            <p >R$ </p>
            <input  onChange={(e)=>setVal(parseInt(e.target.value))} ></input>
            <button onClick={()=> setCheckOut(true)}>Donar</button>

          </div>
        </div>
        <div >
          <img></img>
        </div>
      </div>


         ) 
      }
      <div>

        <Footer />
      </div>
    </div>
  );
};

export default PaypalPage;
