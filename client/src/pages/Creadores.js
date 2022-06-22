import React from 'react'
import background from "./imgs/museo.png"
import presentador from "./imgs/presentador.png"
import style from "./styles/Creadores.module.css"
import { useAuth0 } from '@auth0/auth0-react'
import Headerlogin from '../components/Headerlogin'
import Header from '../components/Header'
import Footer from "../components/Footer.js"

const Creadores = () => {

  const { isAuthenticated } = useAuth0();
    return (
      <div>
        {
      isAuthenticated ? (
      <div >
          <Headerlogin />
          {/* Acá el contenido para logueados */}
          <h1>Acá van los creadores</h1>
          <div class="wrapper">
       <header>
            <img src={background} classname={style.background} alt="background"/>
            <img src={presentador} classname={style.presentador} alt="presentador"/>
            <h1 className={style.creadores}>CREADORES</h1>
        </header> 
        <section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis unde</section>
    </div>
      </div>
  
      ):
      <div className={style.total}>
          <Header />
          {/* Acá el contenido para no logueados (en este caso lo mismo) */}
          <h1>Acá van los creadores</h1>
          <div class="wrapper">
       <header>
            <img src={background} classname={style.background} alt="background"/>
            <img src={presentador} classname={style.presentador} alt="presentador"/>
            <h1 className={style.creadores}>CREADORES</h1>
        </header> 
        <section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis undeLorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis unde</section>
    </div>
      </div>
        }
      <div><Footer/></div>
      </div>
    )

}

export default Creadores