import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Configuracion.module.css";
import Footer from "../components/Footer.js";
import { getUserInfo, putUserInfo } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import Upload from "../components/Upload.js";
import Loading from "../components/Loading";
import StatsUser from "../components/StatsUser";
import TeachPoints from "../components/TeachPoints";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useParams } from "react-router-dom";

const Configuracion = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { sub } = useParams();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState(false);
  const [input, setInput] = useState({
    name: "",
    nickname: "",
  });
  const [nicknameUser, setNicknameUser] = useState(false);
  const [errors, setErrors] = useState({});

  const handlerSubmit = () => {
    confirmAlert({
      title: "Confirma borrar su cuenta",
      message: "¿Está seguro de esto?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handlerDeleteAccount(),
        },
        {
          label: "No",
          onClick: () => alert("Canceló el borrado"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(getUserInfo(sub));
  }, [dispatch, sub]);

  useEffect(() => {
    setInput({
      name: userInfo.name,
      nickname: userInfo.nickname,
    });
  }, [dispatch, userInfo]);

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "Se requiere un Nombre";
    if (input.name.length > 20) errors.name = "Máximo 20 caracteres";
    if (!input.nickname) errors.nickname = "Se requiere un Nickname";
    if (input.nickname.length > 20) errors.nickname = "Máximo 20 caracteres";
    return errors;
  }

  function handlerEditName(e) {
    e.preventDefault();
    if (userInfo.nameChanges > 2) {
      alert("No podes cambiar el nombre en más de dos oportunidades.");
    } else {
      setNameUser(true);
    }
  }

  function handlerEditNickname(e) {
    e.preventDefault();
    setNicknameUser(true);
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

  async function handlerConfirmEditName() {
    await dispatch(
      putUserInfo(userInfo.sub, {
        name: input.name,
        nameChanges: userInfo.nameChanges,
      })
    );
    dispatch(getUserInfo(userInfo.sub));
    setNameUser(false);
    setErrors({});
  }

  async function handlerConfirmEditNickname() {
    await dispatch(
      putUserInfo(userInfo.sub, {
        nickname: input.nickname,
      })
    );
    dispatch(getUserInfo(userInfo.sub));
    setNicknameUser(false);
    setErrors({});
  }

  function handlerDeleteAccount() {
    dispatch(putUserInfo(userInfo.sub, { statusDeleted: true }));
    navigate("/");
  }
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div className="row">
          <div className="col">
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
                        name="name"
                        type="text"
                        autoComplete="off"
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
                        className={style.buttonUpdate}
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
                          fontSize="large"
                          color="primary"
                          cursor="pointer"
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
                        name="nickname"
                        type="text"
                        autoComplete="off"
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
                      <button
                        className={style.buttonUpdate}
                        onClick={handlerEditNickname}
                      >
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
                          fontSize="large"
                          color="primary"
                          cursor="pointer"
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
                      <button
                        className={style.buttonUpdate}
                        onClick={handlerSubmit}
                      >
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
                        characteristic="Teach Points"
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      <StatsUser
                        number={userInfo.myPosition}
                        characteristic="Mi Ranking"
                        link="Ver Ranking"
                        linkTo="/ranking"
                      />
                    </div>

                    <div className={`col-lg-6 ${style.col2}`}>
                      <StatsUser
                        number={userInfo.cantFav}
                        characteristic="Mis Favoritos"
                        link="Ver Favoritos"
                        linkTo="/favoritas"
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      <StatsUser
                        number={userInfo.cantQuest}
                        characteristic="Mis preguntas"
                        link="Ver Mis Preguntas"
                        linkTo="/mispreguntas"
                      />
                    </div>

                    <div className={`col-lg-6 ${style.col2}`}>
                      <StatsUser
                        number={userInfo.cantAns}
                        characteristic="Mis Respuestas"
                        link="Ver Mis Respuestas"
                        linkTo="/misrespuestas"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.middleRow}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`col-lg-6 ${style.col1}`}>
              <div className={`row ${style.row}`}>
                <div className={`col-lg-6 ${style.col3}`}>Mis logros</div>

                <div className={`col-lg-6 ${style.col2}`}>
                  <TeachPoints
                    number={userInfo.myTeachPoints}
                    characteristic="Teach Points"
                  />
                </div>
              </div>

              <div className={`row ${style.row}`}>
                <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                  <StatsUser
                    number={userInfo.myPosition}
                    characteristic="Mi Ranking"
                    link="Ver Ranking"
                  />
                </div>

                <div className={`col-lg-6 ${style.col2}`}>
                  <StatsUser
                    number={userInfo.cantFav}
                    characteristic="Mis Favoritos"
                    link="Ver Favoritos"
                  />
                </div>
              </div>

              <div className={`row ${style.row}`}>
                <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                  <StatsUser
                    number={userInfo.cantQuest}
                    characteristic="Mis preguntas"
                    link="Ver Mis Preguntas"
                  />
                </div>

                <div className={`col-lg-6 ${style.col2}`}>
                  <StatsUser
                    number={userInfo.cantAns}
                    characteristic="Mis Respuestas"
                    link="Ver Mis Respuestas"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Configuracion;
