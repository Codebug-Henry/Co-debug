import React from "react";
import style from "./styles/Creadores.module.css";
import Footer from "../components/Footer.js";
import Creador from "../components/Creador";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { getNotifications } from "../redux/actions";

let luciano = {
  name: "Luciano Morea",
  profesion: "Desarrollador Full Stack",
  email: "lucianommorea@gmail.com",
  linkedin: "https://www.linkedin.com/in/luciano-morea",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1657061942/codebug/ubbkbccekzqjenczkvwn.jpg",
  github: "https://github.com/lucianommorea",
};

let gonzalo = {
  name: "Gonzalo Gomez",
  profesion: "Desarrollador Full Stack",
  email: "gonzalogdv@gmail.com",
  linkedin: "https://www.linkedin.com/in/gonzalo-gomez-0156b985/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1657481931/codebug/tmzjp7bf7apzyexfxhur.jpg",
  github: "https://github.com/GonzaloGDV",
};

let matias = {
  name: "Matías Balbi",
  profesion: "Desarrollador Full Stack",
  email: "matibalbi@gmail.com",
  linkedin: "https://www.linkedin.com/in/matiasbalbi/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1656770336/codebug/mbtnjqrtoesnxrlylvdb.png",
  github: "https://github.com/matibalbi",
};

let patricio = {
  name: "Patricio Colella",
  profesion: "Desarrollador Full Stack",
  email: "patriciogabrielcolella@gmail.com",
  linkedin: "https://www.linkedin.com/in/patricio-colella-728212200/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1656702863/codebug/mr9jd9vwljre9fdu5yzp.jpg",
  github: "https://github.com/Patricio-Colella",
};

let felipe = {
  name: "Felipe Guitelman",
  profesion: "Desarrollador Full Stack",
  email: "felipe.guitelman@gmail.com",
  linkedin: "https://www.linkedin.com/in/felipe-guitelman-b83427145/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1656642327/codebug/ls3q6jh4b7nnkstdjvnc.jpg",
  github: "https://github.com/FelipeGuitelman",
};

let david = {
  name: "David Cunha Quinteros",
  profesion: "Desarrollador Full Stack",
  email: "regenerik@gmail.com",
  linkedin: "https://www.linkedin.com/in/david-cunha-quinteros/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1656702881/codebug/xrtq44h5y2u9ikokkrg8.jpg",
  github: "https://github.com/regenerik",
};

let gustavo = {
  name: "Gustavo de la Torre",
  profesion: "Desarrollador Full Stack",
  email: "tutemaposo2016@gmail.com",
  linkedin: "https://www.linkedin.com/in/gustavo-de-la-torre-309a581ba/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1657552179/codebug/c2hrgarb1urpsbnxutku.jpg",
  github: "https://github.com/XDrimer",
};

let santiago = {
  name: "Santiago Trabucco",
  profesion: "Desarrollador Full Stack",
  email: "santiagotrabucco@gmail.com",
  linkedin: "https://www.linkedin.com/in/santiagotrabucco/",
  photo:
    "https://res.cloudinary.com/codebugers/image/upload/v1656857791/codebug/qcbkl7rtfar5l0lxj0iw.jpg",
  github: "https://github.com/Sandotcom",
};

const Creadores = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
      if (isAuthenticated) {
        dispatch(getNotifications(user.sub))
      }
  }, [dispatch, user, isAuthenticated]);
  
  return (
    <div className={style.fullContainer}>
      <div>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.middleRow}`}>
            <div className={`col-lg-6 ${style.col1}`}>
              <Creador
                photo={gonzalo.photo}
                name={gonzalo.name}
                profesion={gonzalo.profesion}
                email={gonzalo.email}
                github={gonzalo.github}
                linkedin={gonzalo.linkedin}
              />
              <Creador
                photo={david.photo}
                name={david.name}
                profesion={david.profesion}
                email={david.email}
                github={david.github}
                linkedin={david.linkedin}
              />
              <Creador
                photo={felipe.photo}
                name={felipe.name}
                profesion={felipe.profesion}
                email={felipe.email}
                github={felipe.github}
                linkedin={felipe.linkedin}
              />
              <Creador
                photo={luciano.photo}
                name={luciano.name}
                profesion={luciano.profesion}
                email={luciano.email}
                github={luciano.github}
                linkedin={luciano.linkedin}
              />
            </div>

            <div className={`col-lg-6 ${style.col2}`}>
              <Creador
                photo={matias.photo}
                name={matias.name}
                profesion={matias.profesion}
                email={matias.email}
                github={matias.github}
                linkedin={matias.linkedin}
              />
              <Creador
                photo={gustavo.photo}
                name={gustavo.name}
                profesion={gustavo.profesion}
                email={gustavo.email}
                github={gustavo.github}
                linkedin={gustavo.linkedin}
              />
              <Creador
                photo={patricio.photo}
                name={patricio.name}
                profesion={patricio.profesion}
                email={patricio.email}
                github={patricio.github}
                linkedin={patricio.linkedin}
              />
              <Creador
                photo={santiago.photo}
                name={santiago.name}
                profesion={santiago.profesion}
                email={santiago.email}
                github={santiago.github}
                linkedin={santiago.linkedin}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Creadores;
