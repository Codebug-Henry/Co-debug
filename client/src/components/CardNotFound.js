import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/CardNotFound.module.css";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import BlockIcon from "@mui/icons-material/Block";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const CardNotFound = () => {

  return (
    <div
      className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <AccountBoxIcon
            fontSize="large" />
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>
          <div className={style.TitleAndExtrasBox}>
            <div className={style.firstRow}>
              <div className={style.userPreg}>
                <span>Admin </span>
              </div>
            </div>
            <div className={style.Title}>
              <span> 404 - NOT FOUND </span>
            </div>
          </div>
          <div className={style.questionText}>
            <p>No existen resultados con la consulta solicitada. </p>
            <p>Ingresa una nueva pregunta.</p>
          </div>
          <div className={style.bajoTexto}>
            {/* <div className={style.likes}>
              <span className={style.span2}>
                <ThumbUpIcon
                  fontSize="medium"
                  color="action"
                  className={style.fav}
                />
              </span>
              <span className={style.spanLikes}>0</span>
              <span className={style.span}>
                <ThumbDownIcon
                  fontSize="medium"
                  color="action"
                  className={style.fav}
                />
              </span>
            </div>

            <div>
                <span className={style.span3}>
                  <FavoriteIcon
                    fontSize="medium"
                    color="action"
                    id="favorite"
                    className={style.fav}
                  />
                </span>
            </div>
            <div>
              <span className={style.span5}>
                <BlockIcon
                  className={style.delete}
                  fontSize="medium"
                  color="action"
                />
              </span>
            </div> */}
            <div>
              <Link to={`/preguntar`}>
                <button className={style.answerIt}>Nueva pregunta</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-0 ${style.rightBox}`}></div>
    </div>
  );
};

export default CardNotFound;
