import React from "react";
import style from "./styles/StatsUser.module.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

const StatsUser = ({number, characteristic, link, linkTo}) => {

    return (
    <div>
        <div className={`col-lg-12 ${style.col1}`}>
            <Card sx={{ width: 170, height: 125 }}  id={style.card1} >
                <CardContent sx={{ width: 170, height: 95 }}>
                    <Typography gutterBottom variant="h5" component="div" className={style.typo} >
                        {number} 
                    </Typography>
                    <Typography variant="h6" className={style.typo} >
                        {characteristic}
                    </Typography>
                </CardContent>
                <CardActions sx={{ width: 170, height: 30 }} className={style.card2}>
                    <Button size="medium" className={style.btn} >
                        <Link to={linkTo} style={{ textDecoration: 'none' }}>
                            <Typography gutterBottom variant="caption" style={{ textDecoration: 'none' }} >
                                {link}
                            </Typography>
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </div>
    </div>
    )
}

export default StatsUser;