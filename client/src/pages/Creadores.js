import React from "react";
import style from "./styles/Creadores.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer.js";
import Creador from '../components/Creador';

let luciano = {
  name: 'Luciano Morea',
  profesion: 'Desarrollador Full Stack',
  email: 'lucianommorea@gmail.com',
  linkedin: 'https://www.linkedin.com/in/luciano-morea',
  photo: 'https://media-exp1.licdn.com/dms/image/C5603AQESqRrYU1PB7A/profile-displayphoto-shrink_800_800/0/1630024458215?e=1661385600&v=beta&t=CCSGyfdLAShZY2msqz0KVBcKroJL8RH5Au41hcnAI8E',
  github: 'https://github.com/lucianommorea'
  }

  let gonzalo = {
    name: 'Gonzalo Gomez',
    profesion: 'Desarrollador Full Stack',
    email: 'gonzalogdv@gmail.com',
    linkedin: 'https://www.linkedin.com/in/gonzalo-gomez-0156b985/',
    photo: 'https://media-exp1.licdn.com/dms/image/C4E03AQHrPJNaA_xQRQ/profile-displayphoto-shrink_800_800/0/1612972013299?e=1661385600&v=beta&t=1lbIzsR2k2GfKHSO7VFmh6z059m_BLzYXJSZhDLVMSA',
    github: 'https://github.com/GonzaloGDV'
    }
    
  let matias = {
    name: 'Matías Balbi',
    profesion: 'Desarrollador Full Stack',
    email: 'matibalbi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/matiasbalbi/',
    photo: 'https://media-exp1.licdn.com/dms/image/C4E03AQEqpAyopWiyxg/profile-displayphoto-shrink_800_800/0/1570049909786?e=1661385600&v=beta&t=ip-2OyBLJuiOkxhPAcNc7iIZEDcC6hW2G3gNDJngTEA',
    github: 'https://github.com/matibalbi'
   }

  let patricio = {
    name: 'Patricio Colella',
    profesion: 'Desarrollador Full Stack',
    email: 'patriciogabrielcolella@gmail.com',
    linkedin: 'https://www.linkedin.com/in/patricio-colella-728212200/',
    photo: 'https://res.cloudinary.com/codebugers/image/upload/v1656702863/codebug/mr9jd9vwljre9fdu5yzp.jpg',
    github: 'https://github.com/Patricio-Colella'
  }

  let felipe = {
    name: 'Felipe Guitelman',
    profesion: 'Desarrollador Full Stack',
    email: 'felipe.guitelman@gmail.com',
    linkedin: 'https://www.linkedin.com/in/felipe-guitelman-b83427145/',
    photo: 'https://res.cloudinary.com/codebugers/image/upload/v1656642327/codebug/ls3q6jh4b7nnkstdjvnc.jpg',
    github: 'https://github.com/FelipeGuitelman'
  }

  let david = {
    name: 'David Cunha Quinteros',
    profesion: 'Desarrollador Full Stack',
    email: 'regenerik@gmail.com',
    linkedin: 'https://www.linkedin.com/in/david-cunha-quinteros/',
    photo: 'https://res.cloudinary.com/codebugers/image/upload/v1656702881/codebug/xrtq44h5y2u9ikokkrg8.jpg',
    github: 'https://github.com/regenerik'
  }

  let gustavo = {
    name: 'Gustavo de la Torre',
    profesion: 'Desarrollador Full Stack',
    email: 'tutemaposo2016@gmail.com',
    linkedin: 'https://www.linkedin.com/in/gustavo-de-la-torre-309a581ba/',
    photo: 'https://media-exp1.licdn.com/dms/image/C4D03AQF6Ei7KEuOr2Q/profile-displayphoto-shrink_800_800/0/1646031911164?e=1661385600&v=beta&t=tmOY2NZf646gdf3eSsEcgMTCBvfHjwNZY7QFvcRfEuo',
    github: 'https://github.com/XDrimer'
  }

  let santiago = {
    name: 'Santiago Trabucco',
    profesion: 'Desarrollador Full Stack',
    email: 'santiagotrabucco@gmail.com',
    linkedin: 'https://www.linkedin.com/in/santiagotrabucco/',
    photo: 'https://media-exp1.licdn.com/dms/image/C4E03AQHR0-pjCg6BEQ/profile-displayphoto-shrink_800_800/0/1627139903614?e=1661385600&v=beta&t=O7l3OEXo4Y313kbBX52CLRAMezyoQepFpQLNbP9Ss00',
    github: 'https://github.com/Sandotcom'
  }
  

const Creadores = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-6 ${style.col1}`}>
                <Creador photo={gonzalo.photo} name={gonzalo.name} profesion={gonzalo.profesion} email={gonzalo.email} github={gonzalo.github} linkedin={gonzalo.linkedin}/>
                <Creador photo={david.photo} name={david.name} profesion={david.profesion} email={david.email} github={david.github} linkedin={david.linkedin}/>
                <Creador photo={felipe.photo} name={felipe.name} profesion={felipe.profesion} email={felipe.email} github={felipe.github} linkedin={felipe.linkedin}/>
                <Creador photo={luciano.photo} name={luciano.name} profesion={luciano.profesion} email={luciano.email} github={luciano.github} linkedin={luciano.linkedin}/>
              </div>

              <div className={`col-lg-6 ${style.col2}`}>
                <Creador photo={matias.photo} name={matias.name} profesion={matias.profesion} email={matias.email} github={matias.github} linkedin={matias.linkedin}/>
                <Creador photo={gustavo.photo} name={gustavo.name} profesion={gustavo.profesion} email={gustavo.email} github={gustavo.github} linkedin={gustavo.linkedin}/>
                <Creador photo={patricio.photo} name={patricio.name} profesion={patricio.profesion} email={patricio.email} github={patricio.github} linkedin={patricio.linkedin}/>
                <Creador photo={santiago.photo} name={santiago.name} profesion={santiago.profesion} email={santiago.email} github={santiago.github} linkedin={santiago.linkedin}/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-6 ${style.col1}`}>
                <Creador photo={gonzalo.photo} name={gonzalo.name} profesion={gonzalo.profesion} email={gonzalo.email} github={gonzalo.github} linkedin={gonzalo.linkedin}/>
                <Creador photo={david.photo} name={david.name} profesion={david.profesion} email={david.email} github={david.github} linkedin={david.linkedin}/>
                <Creador photo={felipe.photo} name={felipe.name} profesion={felipe.profesion} email={felipe.email} github={felipe.github} linkedin={felipe.linkedin}/>
                <Creador photo={luciano.photo} name={luciano.name} profesion={luciano.profesion} email={luciano.email} github={luciano.github} linkedin={luciano.linkedin}/>
              </div>

              <div className={`col-lg-6 ${style.col2}`}>
                <Creador photo={matias.photo} name={matias.name} profesion={matias.profesion} email={matias.email} github={matias.github} linkedin={matias.linkedin}/>
                <Creador photo={gustavo.photo} name={gustavo.name} profesion={gustavo.profesion} email={gustavo.email} github={gustavo.github} linkedin={gustavo.linkedin}/>
                <Creador photo={patricio.photo} name={patricio.name} profesion={patricio.profesion} email={patricio.email} github={patricio.github} linkedin={patricio.linkedin}/>
                <Creador photo={santiago.photo} name={santiago.name} profesion={santiago.profesion} email={santiago.email} github={santiago.github} linkedin={santiago.linkedin}/>
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

export default Creadores;
