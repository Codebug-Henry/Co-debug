import React from "react";
import style from "./styles/StatsUser.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const StatsUser2 = ({number, characteristic}) => {

    return (
    <div>
        <div className={`col-lg-12 ${style.col1}`}>
            <Card sx={{ width: 180, height: 140 }}  id={style.card1} >
                <CardContent sx={{ width: 180, height: 140 }}>
                    <Typography gutterBottom variant="h3" component="div" className={style.typo} >
                        {number}
                    </Typography>
                    <Typography variant="h5" className={style.typo} color='orange'>
                        {characteristic}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
    )
}

export default StatsUser2;