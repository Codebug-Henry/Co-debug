import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Favoritas.module.css";
import Footer from "../components/Footer.js";
import { getFavourites, getNotifications } from "../redux/actions";
import Paginated from "../components/Paginated";
import CardQuestion from "../components/CardQuestion";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";
// import Fab from "@mui/material/Fab";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Loading from "../components/Loading";

const Favoritas = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const favourites = useSelector((state) => state.favourites);
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFavourites(user.sub, page, setLoading));
      dispatch(getNotifications(user.sub));
    }
    // eslint-disable-next-line
  }, [page, dispatch, isFavorite]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (loading) {
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
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-12 ${style.col1}`}>
                <div id={style.all}>
                  <div id={style.explore}>
                    {/* <div>
                      <Fab
                        color="error"
                        aria-label="FavoriteIcon"
                        size="medium"
                      >
                        <FavoriteIcon />
                      </Fab>
                    </div> */}
                    <div className={style.title} >
                      <p className={style.title1}> Mis favoritas</p>
                    </div>
                  </div>
                  <div id={style.myQuestions}>
                    {favourites.length > 0 ? (
                      favourites.map((f) => {
                        return (
                          <CardQuestion
                            cantAnswers={f.cantAnswers}
                            nickname={f.user.nickname}
                            key={f.id}
                            id={f.id}
                            likes={f.likes}
                            title={f.title}
                            text={f.text}
                            teachPoints={f.teachPoints}
                            picture={f.user.picture}
                            page={page}
                            setPage={setPage}
                            setIsFavorite={setIsFavorite}
                            statusValidated={f.statusValidated}
                            macroTags={f.macroTags}
                            microTags={f.microTags}
                          />
                        );
                      })
                    ) : (
                      <div>
                        <p>Aún no agregaste favoritas ... </p>
                      </div>
                    )}
                  </div>
                  <Paginated page={page} setPage={setPage} />
                </div>
              </div>

              <div className={`col-lg-0 ${style.col2}`}></div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
};

export default Favoritas;
