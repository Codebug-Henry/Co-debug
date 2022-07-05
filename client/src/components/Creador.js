import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import style from './styles/Creador.module.css';


const Creador = ({photo, name, profesion, email, github, linkedin}) => {
    

    return (
        <div id={style.card}>
            <div id={style.photo}>
                <img src={photo} alt={name} referrerPolicy="no-referrer"/>
            </div>
            <div id={style.cont}>
                <div >
                    <p id={style.name}>{name}</p>
                </div>
                <div id={style.work}>
                    <p>{profesion}</p>
                </div>
                <div id={style.icons}>
                    <IconButton aria-label="EmailIcon">
                        <a href={`mailto:${email}`} className={style.link} target="_blank" rel="noreferrer">
                            <EmailIcon />
                        </a>
                    </IconButton>
                    <IconButton aria-label="GitHubIcon"> 
                        <a href={github} className={style.link} target="_blank" rel="noreferrer">
                            <GitHubIcon />
                        </a>
                    </IconButton>
                    <IconButton aria-label="LinkedInIcon">
                        <a href={linkedin} className={style.link} target="_blank" rel="noreferrer">
                            <LinkedInIcon />
                        </a>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Creador