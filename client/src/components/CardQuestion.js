import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./styles/CardQuestion.module.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDispatch } from "react-redux";
import { addFavourites, getAllQuestions, getFavourites, modifyQuestion } from "../redux/actions";

const CardQuestion = ({
  cantAnswers,
  nickname,
  picture,
  likes,
  title,
  text,
  teachPoints,
  id,
  sort,
  page, 
  setPage
}) => {

  const dispatch= useDispatch();
  const userInfo = useSelector(state=> state.user)
  const location = useLocation()
  const totalPages = useSelector(state=> state.totalPages)

  function handleAddFavourite(e){
    e.preventDefault()
    addFavourites(userInfo.sub, id, true)
    dispatch(getAllQuestions(sort, page))
  }

  function handleRemoveFavourite(e){
    e.preventDefault()
    addFavourites(userInfo.sub, id, false)
    if(location.pathname === '/'){
      dispatch(getAllQuestions(sort, page))
    }
    if(location.pathname === '/favoritas'){
      dispatch(getFavourites(userInfo.sub, page))
    }
    if(page > totalPages && page !== 1){
      setPage(page=> page-1)
    }
  }

  async function addLike(e){
    e.preventDefault()
    await dispatch(modifyQuestion({id: id, like: 'add'}))
    dispatch(getAllQuestions(sort, page))
  }

  async function removeLike(e){
    e.preventDefault()
    await dispatch(modifyQuestion({id: id, like: 'remove'}))
    dispatch(getAllQuestions('desc', page))
  }

  return (
    <div className={`container-fluid ${style.total}`}>
      <div className={`row ${style.fila}`}>
        <div className={`col-lg-1 ${style.pictureBox}`}>
          <img
            className={style.userImage}
            src={picture}
            alt="imagen user"
          />
        </div>
        <div className={`col-lg-11 ${style.leftBox}`}>
          <div className={style.TitleAndExtrasBox}>
            <div className={style.userPreg}>
              <h6>{nickname} pregunta:</h6>
            </div>
            <div className={style.Title}>
              <h6>{title}</h6>
            </div>
            <div className={style.Extras}>
              <h6>
                Respuestas:{cantAnswers} - T.Points:{teachPoints}
              </h6>
            </div>
          </div>
          <div className={style.questionText}>{text}</div>
          <div className={style.bajoTexto}>
            <div className={style.likes}>
              <ThumbUpIcon fontSize='medium' color="primary" onClick={e=>addLike(e)} className={style.fav}/>
              {likes}
              {/* <img src={like} alt="mano arriba" className={style.like} />
              <img src={dislike} alt="mano abajo" className={style.dislike} /> */}
              <ThumbDownIcon fontSize='medium' color="error" onClick={e=>removeLike(e)} className={style.fav} />
            </div>

            <div>
              {/* <img src={favorito} alt="favorito" className={style.like} /> */}
                <FavoriteIcon fontSize="medium" 
                              color='error'
                              id='favorite'
                              className={ userInfo.favourites.includes(id) ? style.fav : style.notFav }
                              onClick={e=> handleRemoveFavourite(e)}  />                
                <FavoriteIcon fontSize="medium"
                              color='string'
                              className={ userInfo.favourites.includes(id) ? style.notFav : style.fav } 
                              onClick={e=> handleAddFavourite(e)} />

            </div>
            <div>
              {/* <img src={denuncia} alt="denuncia" className={style.like} /> */}
              <BlockIcon fontSize="medium" />
            </div>
            <div>
              <Link to={`/responder/${id}`}>
                <button className={style.answerIt}>Responder</button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      <div className={`col-lg-0 ${style.rightBox}`}>
       
      </div>
    </div>
  );
};

export default CardQuestion;
