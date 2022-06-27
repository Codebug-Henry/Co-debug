import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import style from './styles/InfoPopper.module.css';
import InfoIcon from '@mui/icons-material/Info';

export default function InfoPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" className={style.button} onClick={handleClick}>
        <InfoIcon/>
        Info Pregunta
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', width: 300,backgroundColor: "coral", borderRadius: 5, marginTop:1 }}>
          <b>P</b>ara crear una pregunta se debe ingresar un titulo y una explicacion de la misma. <b>S</b>e debe elegir al menos un Macro Tag que generalice la tematica de la pregunta. <b>S</b>e debe agregar almenos un Micro Tag para especificar mas la tematica de la pregunta. <b>U</b>na vez completo hacer click en 'Crear Pregunta' para enviarla.
        </Box>
      </Popper>
    </div>
  );
}
