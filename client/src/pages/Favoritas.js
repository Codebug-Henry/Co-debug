import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Favoritas.module.css";
import Footer from "../components/Footer.js";
import { getFavourites } from "../redux/actions";
import Paginated from "../components/Paginated";
import CardQuestion from "../components/CardQuestion";
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from "../components/Loading";

const Favoritas = () => {

  const userInfo = useSelector(state=> state.user);
  const favourites = useSelector(state => state.favourites);
  const dispatch = useDispatch()
  let cant = favourites.length

  const [page, setPage] = useState(1)

  useEffect(()=>{
    dispatch(getFavourites(userInfo.sub, page))
  }, [userInfo, cant, page, dispatch])


  const { isAuthenticated, isLoading } = useAuth0();

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
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-11 ${style.col1}`}>
              <div id={style.all}>
                  <div id={style.explore}>
                    <div>
                      <Fab color='error' aria-label="FavoriteIcon" size="medium" >
                        <FavoriteIcon />
                      </Fab>
                    </div>
                    <div>
                      <p> Mis preguntas favoritas</p>
                    </div>
                  </div>
                  <div id={style.myQuestions}>
                    {
                      favourites.length > 0 ?
                      favourites.map(f => {
                          return (
                            <CardQuestion
                                cantAnswers={f.cantAnswers}
                                // nickname={f.user.nickname}
                                key={f.id}
                                id={f.id}
                                likes={f.likes}
                                title={f.title}
                                text={f.text}
                                teachPoints={f.teachPoints}
                                // picture={f.user.picture}
                              />
                          )
                      }) :
                      <div>
                          <p>
                            Aún no agregaste favoritos ...
                          </p>
                      </div>
                    }

                  </div>
                  <Paginated page={page} setPage={setPage}/>
                </div>
              </div>

              <div className={`col-lg-1 ${style.col2}`}>
                {/* "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum." */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.colOut}`}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat." "Sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
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

export default Favoritas;
