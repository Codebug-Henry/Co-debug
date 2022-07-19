import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Ranking.module.css";
import Footer from "../components/Footer.js";
import Paginated from "../components/Paginated";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
import { getRanking } from "../redux/actions";
import Loading from "../components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { getNotifications } from "../redux/actions";
import oro from '../images/oro.png';
import plata from '../images/plata.png';
import bronce from '../images/bronce.png';
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

const Ranking = () => {
  const dispatch = useDispatch();
  const ranking = useSelector((state) => state.ranking);
  const userInfo = useSelector(state => state.user)
  const [sort, setSort] = useState("points-desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth0();
  const [width, setWidth] = useState(window.innerWitdh);

  useEffect(() => {
    dispatch(getRanking(sort, page, setLoading));
  }, [dispatch, sort, page]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications(user.sub));
    }
  }, [dispatch, user, isAuthenticated]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const handleSort = (e) => {
    setPage(1)
    setSort(e.target.value);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (isAuthenticated && user.email_verified === false) {
    return (
      <>
        <NotVerified />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else if (isAuthenticated && userInfo.statusBanned === true) {
    return (
      <>
        <BannedUser />
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    );
  } else return (
      <div className={style.fullContainer}>
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={style.filterbar}>
            
            {/* <select className={style.select} value={sort} onChange={handleSort}>
              <option value="points-desc">Teach Points</option>
              <option value="points-asc">Teach Points ascendente</option>
              <option value="answ-desc">Respuestas</option>
              <option value="answ-asc">Respuestas ascendente</option>
              <option value="quest-desc">Preguntas</option>
              <option value="quest-asc">Preguntas ascendente</option>
            </select> */}

            <FormControl sx={{width: 140, margin: 0.5}}>
                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                <Select value={sort} label="Categoría" onChange={handleSort}>
                  <MenuItem value="points-desc">Teach Points</MenuItem>
                  <MenuItem value="answ-desc">Respuestas</MenuItem>
                  <MenuItem value="quest-desc">Preguntas</MenuItem>
                </Select>
              </FormControl>
          </div>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row align-items-start ${style.columnsname}`}>
              <p className={`col-1 ${style.userImageTop}`}></p>
              <p className={`col-1 ${style.colunmNroTop}`}>Nro.</p>
              {width > 800 ? (
                <p className={`col ${style.colunmNickTop}`}>Nickname</p>
              ) : (
                <p className={`col ${style.colunmNickTop}`}>Nick</p>
              )}
              {width > 800 ? (
                <p className={`col ${style.colunmTeachTop}`}>Teach Points</p>
              ) : (
                <p className={`col ${style.colunmTeachTop}`}>Points</p>
              )}
              {width > 1400 ? (
                <p className={`col-1 ${style.colunmRespTop}`}>Respuestas</p>
              ) : (
                <p className={`col-1 ${style.colunmRespTop}`}>Resp</p>
              )}
              {width > 1400 ? (
                <p className={`col-1 ${style.colunmPregTop}`}>Preguntas</p>
              ) : (
                <p className={`col-1 ${style.colunmPregTop}`}>Preg</p>
              )}
            </div>
            { sort.includes('desc') &&
              ranking.map((e) => e.myPosition === 1 ? 
              <Link to={`/user/${e.sub}`} className={style.toUser1}>
                <div
                className={userInfo.sub === e.sub ? `row align-items-start ${style.info1sub}` : `row align-items-start ${style.info1}`}
                key={e.sub}
                > 
                  <img
                    src={e.picture}
                    className={`col-1 ${style.userImage}`}
                    referrerPolicy="no-referrer"
                    alt={e.name}
                  />
                <p className={`col-1 ${style.colunmNro}`}><img src={oro} className={style.medal} alt="1" /></p>
                {width > 800 ? (
                  <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
                ) : (
                  <p className={`col ${style.colunmNick}`}>{e.nickname.slice(0,13)}</p>
                )}
                <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
                <p className={`col-1 ${style.colunmResp}`}>{e.cantAns}</p>
                <p className={`col-1 ${style.colunmPreg}`}>{e.cantQuest}</p>
              </div>
            </Link>:
            null )
            }
            { sort.includes('desc') &&
              ranking.map((e) => e.myPosition === 2 ? 
              <Link to={`/user/${e.sub}`} className={style.toUser1}>
                <div
                className={userInfo.sub === e.sub ? `row align-items-start ${style.info2sub}` : `row align-items-start ${style.info2}`}
                key={e.sub}
                >
                <img
                  src={e.picture}
                  className={`col-1 ${style.userImage}`}
                  referrerPolicy="no-referrer"
                  alt={e.name}
                />
                <p className={`col-1 ${style.colunmNro}`}><img src={plata} className={style.medal} alt="2" /></p>
                {width > 800 ? (
                  <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
                ) : (
                  <p className={`col ${style.colunmNick}`}>{e.nickname.slice(0,13)}</p>
                )}
                <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
                <p className={`col-1 ${style.colunmResp}`}>{e.cantAns}</p>
                <p className={`col-1 ${style.colunmPreg}`}>{e.cantQuest}</p>
              </div>
            </Link> :
            null )
            }
            { sort.includes('desc') &&
              ranking.map((e) => e.myPosition === 3 ? 
              <Link to={`/user/${e.sub}`} className={style.toUser1}>
                <div
                className={userInfo.sub === e.sub ? `row align-items-start ${style.info3sub}` : `row align-items-start ${style.info3}`}
                key={e.sub}
                >
                <img
                  src={e.picture}
                  className={`col-1 ${style.userImage}`}
                  referrerPolicy="no-referrer"
                  alt={e.name}
                />
                <p className={`col-1 ${style.colunmNro}`}><img src={bronce} className={style.medal} alt="3" /></p>
                {width > 800 ? (
                  <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
                ) : (
                  <p className={`col ${style.colunmNick}`}>{e.nickname.slice(0,13)}</p>
                )}
                <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
                <p className={`col-1 ${style.colunmResp}`}>{e.cantAns}</p>
                <p className={`col-1 ${style.colunmPreg}`}>{e.cantQuest}</p>
              </div> 
            </Link> :
            null )
            }
            {ranking.map((e) => e.myPosition > 3 ? 
              <Link to={`/user/${e.sub}`} className={style.toUser1}>
                <div
                  className={userInfo.sub === e.sub ? `row align-items-start ${style.infosub}` : `row align-items-start ${style.info}`}
                  key={e.sub}
                >
                  <img
                    src={e.picture}
                    className={`col-1 ${style.userImage}`}
                    referrerPolicy="no-referrer"
                    alt={e.name}
                  />
                  <p className={`col-1 ${style.colunmNro}`}>{e.myPosition}</p>
                  {width > 800 ? (
                    <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
                  ) : (
                    <p className={`col ${style.colunmNick}`}>{e.nickname.slice(0,13)}</p>
                  )}
                  <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
                  <p className={`col-1 ${style.colunmResp}`}>{e.cantAns}</p>
                  <p className={`col-1 ${style.colunmPreg}`}>{e.cantQuest}</p>
                </div> 
              </Link> :
              null
            )}
             {/* { sort.includes('asc') &&
              ranking.map((e) => e.myPosition === 3 ? 
              <div
              className={`row align-items-start ${style.info3}`}
              key={e.sub}
              >
              <img
                src={e.picture}
                className={`col-1 ${style.userImage}`}
                referrerPolicy="no-referrer"
                alt={e.name}
              />
              <p className={`col-1 ${style.colunmNro}`}><img src={bronce} className={style.medal} alt="3" /></p>
              <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
              <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
              <p className={`col ${style.colunmResp}`}>{e.cantAns}</p>
              <p className={`col ${style.colunmPreg}`}>{e.cantQuest}</p>
            </div> :
            null )
            }
            { sort.includes('asc') &&
              ranking.map((e) => e.myPosition === 2 ? 
              <div
              className={`row align-items-start ${style.info2}`}
              key={e.sub}
              >
              <img
                src={e.picture}
                className={`col-1 ${style.userImage}`}
                referrerPolicy="no-referrer"
                alt={e.name}
              />
              <p className={`col-1 ${style.colunmNro}`}><img src={plata} className={style.medal} alt="2" /></p>
              <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
              <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
              <p className={`col ${style.colunmResp}`}>{e.cantAns}</p>
              <p className={`col ${style.colunmPreg}`}>{e.cantQuest}</p>
            </div> :
            null )
            }
            { sort.includes('asc') &&
              ranking.map((e) => e.myPosition === 1 ? 
              <div
              className={`row align-items-start ${style.info1}`}
              key={e.sub}
              >
              <img
                src={e.picture}
                className={`col-1 ${style.userImage}`}
                referrerPolicy="no-referrer"
                alt={e.name}
              />
              <p className={`col-1 ${style.colunmNro}`}><img src={oro} className={style.medal} alt="1" /></p>
              <p className={`col ${style.colunmNick}`}>{e.nickname}</p>
              <p className={`col ${style.colunmTeach}`}>{e.myTeachPoints}</p>
              <p className={`col ${style.colunmResp}`}>{e.cantAns}</p>
              <p className={`col ${style.colunmPreg}`}>{e.cantQuest}</p>
            </div> :
            null )
            } */}
          </div>
          <Paginated page={page} setPage={setPage} />
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
};

export default Ranking;
