import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './styles/SubAnswerCard.module.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const SubAnswerCard = ({
  sId,
  picture,
  nickname,
  text,
  userSub,
  setIsModify,
}) => {
  const userInfo = useSelector((state) => state.user);
  const [style1, setStyle1] = useState(true);

  const [errors, setErrors] = useState({});
  const [newSubAnswer, setNewSubAnswer] = useState({
    sub: userInfo.sub,
    id: sId,
    text: text,
  });

  function validate(newSubAnswer) {
    let errors = {};
    if (!newSubAnswer.text) errors.text = 'Se requiere una respuesta';
    if (newSubAnswer.text.length > 2000)
      errors.text = 'La respuesta debe tener un máximo de 2000 caracteres';
    return errors;
  }

  function toRender() {
    style1 === true ? setStyle1(false) : setStyle1(true);
  }

  function handleEditAnswer(e) {
    e.preventDefault();
    toRender();
  }

  function onChangeEditInputText(e) {
    setNewSubAnswer({
      ...newSubAnswer,
      text: e.target.value,
    });
    setErrors(
      validate({
        text: e.target.value,
      })
    );
  }

  const handleDeleteSubAnswer = async (id) => {
    let deletePack = { id, statusDeleted: true };
    await axios.put(`/subAnswer`, deletePack);
    setIsModify((prevState) => !prevState);
  };

  const handleModifySubAnswer = async (id) => {
    let modifyPack = { id, text: newSubAnswer.text };
    await axios.put(`/subAnswer`, modifyPack);
    setIsModify((prevState) => !prevState);
    toRender();
  };

  return (
    <div className={style.comentarioContainer}>
      <div className={style.comentario}>
        <div className={style.primero}>
          <Link to={`/user/${userSub}`} className={style.toUser}>
            <img
              src={picture}
              className={style.userImage}
              referrerPolicy='no-referrer'
              alt='imgUser'
            />
          </Link>
          <Link to={`/user/${userSub}`} className={style.toUser}>
            <span>{nickname}</span>
          </Link>
        </div>
        <div className={style.buttons}>
          <div className={userInfo.sub === userSub ? null : style.hidden}>
            {/* <div> */}
            <Tooltip title='Editar'>
              <EditIcon
                fontSize='small'
                className={style.moreBtn}
                onClick={(e) => handleEditAnswer(e)}
                color='action'
              />
            </Tooltip>
          </div>
          <div className={userInfo.sub === userSub ? null : style.hidden}>
            {/* <div> */}
            <Tooltip title='Eliminar'>
              <DeleteIcon
                fontSize='small'
                className={style.deleteBtn}
                onClick={() => handleDeleteSubAnswer(sId)}
                color='action'
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={style1 ? null : style.none}>
        <p className={style.texto}>{text}</p>
      </div>
      <div className={style1 ? style.none : style.edit}>
        <div className={style.error2}>
          <textarea
            type='text'
            value={newSubAnswer.text}
            autoComplete='off'
            className={style.editText}
            onChange={(e) => onChangeEditInputText(e)}
          />
          {errors.text && (
            <div className={style.error}>
              <span> {errors.text}</span>
            </div>
          )}
        </div>
        <div className={style1 || errors.text ? style.none : style.editBtn}>
          <CheckIcon
            fontSize='medium'
            color='primary'
            cursor='pointer'
            className={style.confirmEdit}
            onClick={() => handleModifySubAnswer(sId)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubAnswerCard;
