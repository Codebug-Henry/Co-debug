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
import { confirm } from "react-confirm-box";

const Configuracion = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState(false);
  const [newName, setNewName] = useState(userInfo.name);
  const [nicknameUser, setNicknameUser] = useState(false);
  const [newNickname, setNewNickname] = useState(userInfo.nickname);
  const optionsWithLabelChange = {
    closeOnOverlayClick: false,
    labels: {
      confirmable: "Confirmar",
      cancellable: "Cancelar",
    },
  };

  useEffect(() => {
    dispatch(getUserInfo(userInfo.sub));
  }, [dispatch, userInfo.sub]);

  async function handlerConfirmEditName() {
    await dispatch(
      putUserInfo(userInfo.sub, {
        name: newName,
        nameChanges: userInfo.nameChanges,
      })
    );
    dispatch(getUserInfo(userInfo.sub));
    setNameUser(false);
  }

  function handlerEditName(e) {
    e.preventDefault();
    setNameUser(true);
  }

  function handlerChangeName(e) {
    e.preventDefault();
    setNewName(e.target.value);
  }

  async function handlerConfirmEditNickname() {
    await dispatch(
      putUserInfo(userInfo.sub, {
        nickname: newNickname,
      })
    );
    dispatch(getUserInfo(userInfo.sub));
    setNicknameUser(false);
  }

  function handlerEditNickname(e) {
    e.preventDefault();
    setNicknameUser(true);
  }

  function handlerChangeNickname(e) {
    e.preventDefault();
    setNewNickname(e.target.value);
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

  const onClick = async (options) => {
    const result = await confirm(
      "La cuenta se dará de baja definitivamente?",
      options
    );
    if (result) {
      handlerDeleteAccount();
    }
  };

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
                        className={style.inputs}
                        type="text"
                        autoComplete="off"
                        defaultValue={userInfo.name}
                        onChange={(e) => handlerChangeName(e)}
                      />
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
                      <CheckIcon
                        fontSize="large"
                        color="primary"
                        cursor="pointer"
                        onClick={handlerConfirmEditName}
                      />
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
                        className={style.inputs}
                        type="text"
                        autoComplete="off"
                        defaultValue={userInfo.nickname}
                        onChange={(e) => handlerChangeNickname(e)}
                      />
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
                      <CheckIcon
                        fontSize="large"
                        color="primary"
                        cursor="pointer"
                        onClick={handlerConfirmEditNickname}
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row}`}>
                    <Upload />
                  </div>

                  <div className={`row ${style.row}`}>
                    <div className={`col-lg-12 ${style.col2}`}>
                      <button
                        className={style.buttonUpdate}
                        onClick={() => {
                          onClick(optionsWithLabelChange);
                        }}
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
