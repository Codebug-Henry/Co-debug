import React from "react";
import style from "./styles/StatsUser.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TeachPoints = ({number, characteristic}) => {

    return (
    <div>
        <div>
            <Card sx={{ width: 200, height: 130 }} id={style.card1}>
                <CardContent >
                    <Typography gutterBottom variant="h3" component="div" className={style.typo} >
                        {number}
                    </Typography>
                    <Typography variant="h5" className={style.typo} >
                        {characteristic}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
    )
}

export default TeachPoints;