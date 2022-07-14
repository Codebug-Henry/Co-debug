import React, { useState } from "react";
import style from "./styles/Landing.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading.js";
import Footer from "../components/Footer.js";
import CardsQuestions from "../components/CardsQuestions.js";
import CardsQuestsLogOut from "../components/CardsQuestsLogOut.js";
import TopTenRanking from "../components/TopTenRanking";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInfo, getNotifications } from "../redux/actions";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
import Paginated from "../components/Paginated";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Landing = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { statusBanned, cantQuest, cantAns, myPosition, myTeachPoints } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [search, setSearch] = useState("");
  const [easter, setEaster] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInfo(user.sub));
      dispatch(getNotifications(user.sub));
    }
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleEaster = () => {
    setEaster(easter + 1);
    console.log(easter);
    if (easter >= 10) {
      console.log("Pará con la manitoo");
      navigate("/easter");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  } else if (isAuthenticated) {
    if (user.email_verified === false) {
      return (
        <>
          <NotVerified />
          <div className={style.footer}>
            <Footer />
          </div>
        </>
      );
    } else if (statusBanned === true) {
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
          <div className={style.middleRow}>
            {/* Acá el contenido para logueados */}
            <div className={`container-fluid ${style.container}`}>
              <div className={`row ${style.navBar}`}>
                <NavBar search={search} setSearch={setSearch} setPage={setPage} />
              </div>
              <div className={`row ${style.middleRow}`}>
                <div className={`col-lg-8 ${style.col1}`}>
                  <CardsQuestions
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                    search={search}
                    page={page}
                  />
                  <Paginated page={page} setPage={setPage} />
                </div>
                <div className={`col-lg-4 ${style.col2}`}>
                  <div className={`container-fluid${style.rigthContainer}`}>
                    <div className={`row ${style.rightRowTop}`}>
                      <div
                        className={style.datosUser}
                        onClick={() => handleEaster()}
                      >
                        <p className={style.estadisticas}>Mis estadísticas:</p>

                        {/* <p>Mi posición en el Ranking: <span className={style.dato}>{myPosition}</span></p>
                        <p>Mis Teach-Points: <span className={style.dato}>{myTeachPoints}</span></p>
                        <p>Cuántas preguntas hice? <span className={style.dato}>{cantQuest}</span></p>
                        <p>Cuántas preguntas respondí? <span className={style.dato}>{cantAns}</span></p> */}

                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row"><span>Mi posición en el Ranking</span></TableCell>
                                  <TableCell align="right"><span className={style.dato}>{myPosition}</span></TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">Mis Teach-Points</TableCell>
                                  <TableCell align="right"><span className={style.dato}>{myTeachPoints}</span></TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">Cuántas preguntas hice?</TableCell>
                                  <TableCell align="right"><span className={style.dato}>{cantQuest}</span></TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">Cuántas preguntas respondí?</TableCell>
                                  <TableCell align="right"><span className={style.dato}>{cantAns}</span></TableCell>
                                </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </div>
                    </div>
                    <div className={`row ${style.rightRowUp}`}>
                      <div>
                        <p className={style.TituloLog}>¡Hora de interactuar!</p>
                        <p className={style.subTituloLog}>
                          Tu sitio de confianza.
                        </p>
                      </div>
                    </div>
                    <div className={`row ${style.rightRowMidle}`}>
                      <div className={style.datosUser}>
                        <p className={style.estadisticas}>TOP TEN USUARIOS</p>
                        <TopTenRanking />
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
  } else
    return (
      <div className={style.fullContainer}>
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.navBar}`}>
              <NavBar search={search} setSearch={setSearch} setPage={setPage} />
            </div>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-8 ${style.colOutLeft}`}>
                <CardsQuestsLogOut search={search} page={page} />
                <Paginated page={page} setPage={setPage} />
              </div>
              <div className={`col-lg-4 ${style.colOutRigth}`}>
                <div className={`container-fluid${style.rigthContainer}`}>
                  <div className={`row ${style.rightRowUp}`}>
                    <div>
                      <p className={style.Titulo}>¡Bienvenido a CoDebug!</p>
                      <p className={style.subTitulo}>Tu sitio de confianza.</p>
                    </div>
                  </div>
                  <div className={`row ${style.rightRow}`}>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/9wGL7-RZSTg?rel=0"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    ></iframe>
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
export default Landing;
