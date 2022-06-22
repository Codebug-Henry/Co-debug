import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Headerlogin from '../components/Headerlogin';
import Header from "../components/Header"
import style from "./styles/Ayuda.module.css"
import Footer from "../components/Footer.js"

const Ayuda = () => {
    const { isAuthenticated } = useAuth0();
    return (
     
        <div>
            {
                    isAuthenticated ? (
                <div >
                    <Headerlogin />
                </div>
            
                ):
                <div className={style.total}>
                    <Header />
                </div>
            }
                <div className={style.help}>
                    <h1>Preguntas frecuentes</h1>
                    <section className={style.questions}>
                        <div className={style.leftQuestions}>
                                <div className={style.questionContainer}>
                                    <h2>Cual es el proposito de esta pagina?</h2>
                                    <h3>Este sitio tiene como propósito incentivar la colaboración colectiva entre estudiantes iniciantes en programación. El mismo cuenta con las herramientas necesarias para facilitar la comunicación entre usuarios mediante preguntas y respuestas.</h3>
                                </div>
                                <div className={style.questionContainer}>
                                    <h2>Mis datos estan seguros?</h2>
                                    <h3>Tus datos se encuentran en buenas manos. La arquitectura de nuestro sitio está pensada para no exponer información sensible. Ten en cuenta que las informaciones que facilites mediante tus preguntas, respuestas y/o anexos, como tu número de contacto, son enteramente tu responsabilidad.</h3>
                                </div>
                                <div className={style.questionContainer}>
                                    <h2>Si me doy de baja, mis datos se pierden?</h2>
                                    <h3>Efectivamente. Cuando te das de baja nosotros, detras de cortinas, nos encargamos de limpiar los residuos. Tus preguntas, respuestas y hasta tu super foto de perfil se perderán para siempre en el olvido.</h3>
                                </div>
                        </div>
                        <div className={style.rightQuestions}>
                                <div className={style.questionContainer}>
                                    <h2>Para que sirven los Teachpoints?</h2>
                                    <h3>Los "Teachpoints" son nuestra humilde manera de reconocer el esfuerzo ageno y la empatía. Los usuarios con mayor participación se encontrarán visibles en los primeros puestos de nuestra sección: Ranking. Preparado/a para la fama?</h3>
                                </div>
                                <div className={style.questionContainer}>
                                    <h2>Cuanto tarda en ser respondida mi pregunta?</h2>
                                    <h3>Tristemente eso ya no depende de nosotros. Otros usuarios de gran corazón velarán por tu salud emocional al intentar responder tu pregunta incluso antes que otras recien llegadas. Esto se debe a su gran humanidad y tal vez también porque ganan puntos extras por responder las preguntas mas longevas en nuestro sistema.</h3>
                                </div>
                                <div className={style.questionContainer}>
                                    <h2>Que hago ante un comportamiento inadecuado?</h2>
                                    <h3>Denunciá cualquier comportamiento que concideres impropio, irrespetuoso o de mal gusto con cualquiera de los administradores. Encontrarás un botón "denunciar" disponible en preguntas y respuestas por toda nuestra página.
                                        Igual, ante todo, te pedimos paciencia. Somos muy geniales pero todavía no somos pulpos!</h3>
                                </div>
                        </div>
                    </section>
                </div>
                <div><Footer/></div>
      </div>
      
    )
}

export default Ayuda