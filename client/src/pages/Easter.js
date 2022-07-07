import React from 'react'
import style from "./styles/Easter.module.css"
import EasterHeader from "../components/EasterHeader"
import mem1 from "../images/mem1.jpg"
import mem2 from "../images/mem2.jpg"
import mem3 from "../images/mem3.jpg"
import mem4 from "../images/mem4.jpg"
import mem5 from "../images/mem5.jpg"
import mem6 from "../images/mem6.jpg"
import mem7 from "../images/mem7.jpg"


const Easter = () => {
  return (
    <div className={style.everyReal}>

        <div className={style.elTodo}>
            <div className={style.header}>
                <EasterHeader />
            </div>
            <div className={style.tituloYCosas}>
                    <p className={style.titulo}>EASTER EGG ENCONTRADO</p>

                    <div className={style.cajaParrafo}>
                        <p className={style.parrafo}>Bienvenido al sector de locura y rizas.
                        Acá se terminó la seriedad por un buen rato. Tenemos algunos memes para compartir
                        y disfrutar con toda la familia de programadores. Si, solo la de programadores.
                        Tu familia no se va a reir ni pagando.
                        Aprovechando que andas por acá te contamos que hacer esta página fue un desafio de primerísimo nivel.
                        La mayoría del equipo ya casi no tiene amigos fuera de meet's en google y algunos engordamos algunos kilos.
                        Lo principal a destacar es el esfuerzo de todos al rededor de este proyecto. Seguramente será el comienzo de algo muchísimo más grande para todos nosotros a futuro.
                        
                        Dicho todo esto, espero lo disfrutes, Y por favor dejá de hacer mil clicks en todo que ya no hay más "Easter-Eggs" por ahí...
                        Un fuerte abrazo de parte del equipo de Codebug.</p>
                    </div>
                    
            </div>

        </div>

        <div className={style.primerBloque}>

            <div className={`row-3-lg {style.memes}`}>
                <a href={mem1} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem1} alt="meme1" width="220" height="250" border="0" align="center"/>
                </a>
            </div>
            <div className={`row-3-lg {style.memes}`}>
                <a href={mem2} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem2} alt="meme2"/>
                </a>
            </div>
            <div className={`row-3-lg {style.memes}`}>
                <a href={mem3} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem3} alt="meme3"/>
                </a>
            </div>
            <div className={`row-3-lg {style.memes}`}>
                <a href={mem4} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem4} alt="meme4"/>
                </a>
            </div>
            <div className={`row-3-lg {style.memes}`}>
                <a href={mem5} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem5} alt="meme5"/>
                </a>
            </div>
            <div className={`row-3-lg {style.memes}`}>
                <a href={mem6} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem6} alt="meme6"/>
                </a>
            </div>
            <div className={`row-3-lg {style.memes}`}>
                <a href={mem7} target="_blank" rel="noreferrer">
                    <img className={style.elMeme} src={mem7} alt="meme7"/>
                </a>
            </div>

        </div>

        <div className={style.segundoBloque}>

            <p className={style.masMemes}>En breve más memes..</p>

        </div>




    </div>
  )
}

export default Easter