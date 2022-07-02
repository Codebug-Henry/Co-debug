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
            <Card sx={{ width: 200, height: 150 }}  id={style.card1} >
                <CardContent sx={{ width: 200, height: 110 }}>
                    <Typography gutterBottom variant="h4" component="div" className={style.typo} >
                        {number} 
                    </Typography>
                    <Typography variant="h6" className={style.typo} >
                        {characteristic}
                    </Typography>
                </CardContent>
                <CardActions className={style.card2}>
                    <Button size="small" className={style.btn} >
                        <Link to={linkTo} style={{ textDecoration: 'none' }}>
                            <span>
                                {link}
                            </span>
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </div>
    </div>
    )
}

export default StatsUser;