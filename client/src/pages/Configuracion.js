import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import style from './styles/Configuracion.module.css';
import Footer from '../components/Footer.js';
import { getUserInfo, putUserInfo, getNotifications } from '../redux/actions';
import CheckIcon from '@mui/icons-material/Check';
import Upload from '../components/Upload.js';
import Loading from '../components/Loading';
import NotVerified from '../components/NotVerified';
import BannedUser from '../components/BannedUser';
import StatsUser from '../components/StatsUser';
import TeachPoints from '../components/TeachPoints';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import MensajeAlerta from '../components/MensajeAlerta';

const Configuracion = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nameUser, setNameUser] = useState(false);
  const [input, setInput] = useState({
    name: '',
    nickname: '',
  });
  const [nicknameUser, setNicknameUser] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications(user.sub));
    }
  }, [dispatch, user, isAuthenticated]);

  const handlerSubmit = () => {
    confirmAlert({
      title: 'Confirma borrar su cuenta',
      message: '¿Está seguro de esto?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => handlerDeleteAccount(),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  useEffect(() => {
    setInput({
      name: userInfo.name,
      nickname: userInfo.nickname,
    });
  }, [dispatch, userInfo]);

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'Se requiere un Nombre';
    if (input.name.length > 25) errors.name = 'Máximo 25 caracteres';
    if (!input.nickname) errors.nickname = 'Se requiere un Nickname';
    if (input.nickname.length > 25) errors.nickname = 'Máximo 25 caracteres';
    return errors;
  }

  const textAlerta =
    'No podes cambiar el Nickname en más de dos oportunidades.';

  function handlerEditName(e) {
    e.preventDefault();
    setNameUser(true);
  }

  const editNickname = (e) => {
    if (userInfo.nameChanges <= 1) {
      confirmAlert({
        title: '¿Confirma cambiar el Nickname?',
        message: 'Solo podrá hacerlo 2 veces',
        buttons: [
          {
            label: 'Sí',
            onClick: () => handlerEditNickname(e),
          },
          {
            label: 'No',
          },
        ],
      });
    } else {
      MensajeAlerta({ textAlerta });
    }
  };

  function handlerEditNickname(e) {
    e.preventDefault();
    if (userInfo.nameChanges >= 2) {
      MensajeAlerta({ textAlerta });
    } else {
      setNicknameUser(true);
    }
  }

  function handlerChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function handlerConfirmEditNickname() {
    if (userInfo.nickname !== input.nickname) {
      await dispatch(
        putUserInfo(userInfo.sub, {
          nickname: input.nickname,
          nameChanges: userInfo.nameChanges,
        })
      );
      dispatch(getUserInfo(userInfo.sub));
      setNicknameUser(false);
      setErrors({});
    } else {
      setNicknameUser(false);
      setErrors({});
    }
  }

  async function handlerConfirmEditName() {
    await dispatch(
      putUserInfo(userInfo.sub, {
        name: input.name,
      })
    );
    dispatch(getUserInfo(userInfo.sub));
    setNameUser(false);
    setErrors({});
  }

  function handlerDeleteAccount() {
    dispatch(putUserInfo(userInfo.sub, { statusDeleted: true }));
    logout({ returnTo: window.location.origin });
    localStorage.clear();
  }
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else if (user.email_verified === false) {
    return (
      <>
        <NotVerified />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else if (userInfo.statusBanned === true) {
    return (
      <>
        <BannedUser />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else
    return (
      <div className={style.fullContainer}>
        <div className={`row ${style.cien}`}>
          <div className='col'>
            <div className={style.middleRow}>
              <div className={`container-fluid ${style.container}`}>
                <div className={`col-lg-12 ${style.col11}`}>
                  <div className={`row ${style.row} ${style.rowTitle}`}>
                    <span>Editar Perfil</span>
                  </div>
                  <div className={`row ${style.row}`}>
                    <div className={`col-lg-4 ${style.col2} ${style.text}`}>
                      Nombre:
                    </div>

                    <div
                      className={
                        nameUser === false
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      {userInfo.name}
                    </div>
                    <div
                      className={
                        nameUser === true
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      <input
                        className={
                          errors.name ? style.errorInputs : style.inputs
                        }
                        name='name'
                        type='text'
                        autoComplete='off'
                        defaultValue={userInfo.name}
                        onChange={(e) => handlerChange(e)}
                      />
                      {errors.name && (
                        <div className={style.error}>
                          <span> {errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div
                      className={
                        nameUser === false
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      <button
                        className={style.btnCode}
                        onClick={handlerEditName}
                      >
                        Modificar
                      </button>
                    </div>
                    <div
                      className={
                        nameUser === true
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      <div
                        className={errors.name ? style.col2modify : style.check}
                      >
                        <CheckIcon
                          fontSize='large'
                          color='primary'
                          cursor='pointer'
                          onClick={handlerConfirmEditName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`row ${style.row}`}>
                    <div className={`col-lg-4 ${style.col2} ${style.text}`}>
                      Nickname:
                    </div>

                    <div
                      className={
                        nicknameUser === false
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      {userInfo.nickname}
                    </div>
                    <div
                      className={
                        nicknameUser === true
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      <input
                        className={
                          errors.nickname ? style.errorInputs : style.inputs
                        }
                        name='nickname'
                        type='text'
                        autoComplete='off'
                        defaultValue={userInfo.nickname}
                        onChange={(e) => handlerChange(e)}
                      />
                      {errors.nickname && (
                        <div className={style.error}>
                          <span> {errors.nickname}</span>
                        </div>
                      )}
                    </div>

                    <div
                      className={
                        nicknameUser === false
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      <button className={style.btnCode} onClick={editNickname}>
                        Modificar
                      </button>
                    </div>
                    <div
                      className={
                        nicknameUser === true
                          ? `col-lg-4 ${style.col2}`
                          : style.col2modify
                      }
                    >
                      <div
                        className={
                          errors.nickname ? style.col2modify : style.check
                        }
                      >
                        <CheckIcon
                          fontSize='large'
                          color='primary'
                          cursor='pointer'
                          onClick={handlerConfirmEditNickname}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`row ${style.row}`}>
                    <Upload />
                  </div>

                  <div className={`row ${style.row}`}>
                    <div className={`col-lg-12 ${style.col2}`}>
                      <button className={style.btnCode} onClick={handlerSubmit}>
                        Dar de baja mi cuenta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col ${style.middleRow2}`}>
            <div className={style.middleRow}>
              <div className={`container-fluid ${style.container}`}>
                <div className={`col-lg-12 ${style.col1}`}>
                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col3}`}>Mi actividad</div>
                    <div className={`col-lg-6 ${style.col2}`}>
                      <TeachPoints
                        number={userInfo.myTeachPoints}
                        characteristic='Teach Points'
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      <StatsUser
                        number={userInfo.myPosition}
                        characteristic='Mi Ranking'
                        link='Ver Ranking'
                        linkTo='/ranking'
                      />
                    </div>

                    <div className={`col-lg-6 ${style.col2}`}>
                      <StatsUser
                        number={userInfo.cantFav}
                        characteristic='Mis Favoritas'
                        link='Ver Favoritas'
                        linkTo='/favoritas'
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      <StatsUser
                        number={userInfo.cantQuest}
                        characteristic='Mis preguntas'
                        link='Ver Mis Preguntas'
                        linkTo='/mispreguntas'
                      />
                    </div>

                    <div className={`col-lg-6 ${style.col2}`}>
                      <StatsUser
                        number={userInfo.cantAns}
                        characteristic='Respondidas'
                        link='Ver Mis Respuestas'
                        linkTo='/misrespuestas'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
};

export default Configuracion;
