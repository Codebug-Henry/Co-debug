import React from 'react'
import Paypal from '../components/Paypal'
import { useState } from 'react';
import Footer from '../components/Footer.js';
import style from './styles/PaypalPage.module.css'

const PaypalPage = () => {

  const [ val, setVal ] = useState(1)
  const [ checkout, setCheckOut ] = useState(false);

  return (
    
    
    <div>

     { checkout ? (
          <Paypal val={val} />
      ) : (
        <div>
          {/* // <button onClick={()=>{setCheckOut(true)}}>
          //   Checkout
          // </button> */}
          <input onChange={(e)=>setVal(parseInt(e.target.value))} ></input>

          <button onClick={()=> setCheckOut(true)}>Click para setear monto a donar</button>
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