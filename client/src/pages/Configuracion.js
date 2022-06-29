import React from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Configuracion.module.css";
import Footer from "../components/Footer.js";
import Upload from "../components/Upload";

const Configuracion = () => {
  const { isAuthenticated } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            
            <div className={`col-lg-6 ${style.col1}`}>
            
              <div className={`row ${style.row}`}>

                <div className={`col-lg-4 ${style.col2} ${style.text}`}>
                  Nombre:
                </div>

                <div className={`col-lg-4 ${style.col2}`}>
                  {userInfo.name}
                </div>

                <div className={`col-lg-4 ${style.col2}`}>
                  <button className={style.buttonUpdate}>Modificar</button>
                </div>

              </div>

              <div className={`row ${style.row}`}>

                <div className={`col-lg-4 ${style.col2} ${style.text}`}>
                  Nickname:
                </div>

                <div className={`col-lg-4 ${style.col2}`}>
                  {userInfo.nickname}
                </div>

                <div className={`col-lg-4 ${style.col2}`}>
                  <button className={style.buttonUpdate}>Modificar</button>
                </div>
                
              </div>

              <div className={`row ${style.row}`}>

                <Upload />
                {/* <div className={`col-lg-4 ${style.col2} ${style.text}`}>
                  Foto de perfil:
                </div>

                <div className={`col-lg-4 ${style.col2}`}>
                  <img
                    className={style.userImage}
                    src={userInfo.picture}
                    alt={userInfo.name}
                  />
                </div>

                <div className={`col-lg-4 ${style.col2}`}>
                  <button className={style.buttonUpdate}>Modificar</button>
                </div> */}
                
              </div>

              <div className={`row ${style.row}`}>

                <div className={`col-lg-4 ${style.col2}`}>
                  <button className={style.buttonUpdate}>Dar de baja mi cuenta</button>
                </div>
                
              </div>
            
            </div>

            <div className={`col-lg`}>
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

export default Configuracion;
