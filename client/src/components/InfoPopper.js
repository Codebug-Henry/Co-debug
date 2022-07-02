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
        <Box sx={{ border: 0.5, p: 1, bgcolor: 'background.paper', fontSize:'small', width: 300,backgroundColor: "#f9bf00", borderRadius: 2, marginTop:0.5, marginLeft: -20 }}>
          Para crear una pregunta se debe ingresar un título y una explicación de la misma. Se debe elegir al menos un Macro Tag que generalice la temática de la pregunta y al menos un Micro Tag para ser más específico. Una vez completo, hacer click en 'Enviar Pregunta' para finalizar.
        </Box>
      </Popper>
    </div>
  );
}
