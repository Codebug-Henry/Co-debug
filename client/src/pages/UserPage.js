import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/userPage.module.css";
import Footer from "../components/Footer.js";
import { getUserInfo2, getNotifications } from "../redux/actions";
import Loading from "../components/Loading";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
import StatsUser2 from "../components/StatsUser2";
import TeachPoints2 from "../components/TeachPoints2";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";


const UserPage = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const userInfo = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const { sub } = useParams();
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications(user.sub));
      dispatch(getUserInfo2(sub, setLoad))
    }
  }, [dispatch, user, isAuthenticated, sub]);

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
  } else if(load) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if(!userInfo.sub) {
    return <NotFound />
  }
   else
    return (
      <div className={style.fullContainer}>
        <div className={`row ${style.cien}`}>
          <div className="col">
            <div className={style.middleRow}>
              <div className={`container-fluid ${style.container}`}>
                <div className={`col-lg-12 ${style.col11}`}>
                  <div className={`row ${style.row} ${style.rowTitle}`}>
                    <span>Perfil</span>
                  </div>

                  <div className={`row ${style.row}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      Nombre:
                    </div>
                    <div className={`col-lg-6 ${style.col2}`}>
                      {userInfo.name}
                    </div>
                 </div>

                 <div className={`row ${style.row}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                        Foto:
                    </div>
                    <div className={`col-lg-6 ${style.col2} ${style.photo}`}>
                        <div className={style.loader}>
                            <img src={userInfo.picture} alt="foto usuario" className={style.foto} referrerPolicy="no-referrer"/>
                        </div>
                    </div>
                  </div>

                  <div className={`row ${style.row}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      Nickname:
                    </div>
                    <div className={`col-lg-6 ${style.col2}`}>
                      {userInfo.nickname}
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
                    <div className={`col-lg-6 ${style.col3}`}>Actividad</div>
                    <div className={`col-lg-6 ${style.col2}`}>
                      <TeachPoints2
                        number={userInfo.myTeachPoints}
                        characteristic="Teach Points"
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      <StatsUser2
                        number={userInfo.myPosition}
                        characteristic="Ranking"
                      />
                    </div>

                    <div className={`col-lg-6 ${style.col2}`}>
                      <StatsUser2
                        number={userInfo.cantFav}
                        characteristic="Favoritas"
                      />
                    </div>
                  </div>

                  <div className={`row ${style.row2}`}>
                    <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                      <StatsUser2
                        number={userInfo.cantQuest}
                        characteristic="Preguntas"
                      />
                    </div>

                    <div className={`col-lg-6 ${style.col2}`}>
                      <StatsUser2
                        number={userInfo.cantAns}
                        characteristic="Respondidas"
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

export default UserPage;
