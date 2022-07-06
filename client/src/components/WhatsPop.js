import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import style from './styles/WhatsPop.module.css';
// import InfoIcon from '@mui/icons-material/Info';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

const WhatsPop = ({idUser}) => {

    const [ anchorEl, setAnchorEl ] = useState(null);

   
    const [ input , setInput ] = useState("")

    const [direFinal, setDireFinal ] = useState("") 

    const handlerClick = (event) =>{
        setAnchorEl(anchorEl ? null : event.currentTarget )
    }

    const open = Boolean(anchorEl)

    const id = open ? "simple-pooper" : undefined;

    const handleSubmit = () => {
        setDireFinal(`https://web.whatsapp.com/send?phone=${input}&text=https://codebug-ten.vercel.app/responder/${idUser}`)
        setInput("")
    }
    
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleClickAway = () => {
        setAnchorEl(null)
    }

  return (
    <div>
        <button className={style.icoWhats} onClick={handlerClick} type="button" aria-describedby={id}>
            <WhatsappRoundedIcon />
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ border: 0.5, p: 1, bgcolor: 'background.paper', fontSize:'small', width: 300,backgroundColor: "#fed756", borderRadius: 2, marginTop:-13, marginLeft: -10 }}>
                    <p className={style.titleWhats}> {"Coloca el número de la persona con su código de area, sin \n caracteres especiales ni espacios." } </p>
                    <input className={style.input} value={input} onChange={(e)=>handleInput(e)} type="text" placeholder='Ej: "541154685748"'></input>
                    <a className={style.enviar} href={direFinal} target="_BLANK" onClick={handleSubmit} rel="noreferrer">Enviar WhatsApp</a>
                </Box>
            </ClickAwayListener>

        </Popper>
    </div>
  )
}

export default WhatsPop