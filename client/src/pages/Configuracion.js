import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Configuracion.module.css";
import Footer from "../components/Footer.js";
import { deleteUser, getUserInfo, putUserInfo } from "../redux/actions";
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import StatsUser from '../components/StatsUser';
import TeachPoints from "../components/TeachPoints";


const Configuracion = () => {
  const { isAuthenticated } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState(false);
  const [newName, setNewName] = useState(userInfo.name);

  useEffect(()=>{
    dispatch(getUserInfo(userInfo.sub))
  }, [dispatch])

  function handlerConfirmEditName(e){
    e.preventDefault()
    dispatch(putUserInfo({sub: userInfo.sub, name: newName, nameChanges: userInfo.nameChanges}))
    dispatch(getUserInfo(userInfo.sub))
    setNameUser(false)
  }

  function handlerEditName(e){
    e.preventDefault()
    setNameUser(true)
  }

  function handlerChangeName(e){
    e.preventDefault()
    setNewName(e.target.value)
  }

  function handlerDeleteAccount(e){
    e.preventDefault()
    dispatch(deleteUser({sub: userInfo.sub, statusDeleted: true}))
    navigate('/')
  }

  console.log(userInfo)

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

                <div className={nameUser === false ? `col-lg-4 ${style.col2}` : style.col2modify}>
                  {userInfo.name}
                </div>
                <div className={nameUser === true ? `col-lg-4 ${style.col2}` : style.col2modify}>
                  <input  type='text' 
                          autoComplete='off'
                          defaultValue={userInfo.name}
                          onChange={e=>handlerChangeName(e)}
                  />
                </div>

                <div className={nameUser === false ? `col-lg-4 ${style.col2}` : style.col2modify}>
                  <button className={style.buttonUpdate} onClick={e=>handlerEditName(e)}>Modificar</button>
                </div>
                <div className={nameUser === true ? `col-lg-4 ${style.col2}` : style.col2modify}>
                <CheckIcon  fontSize='large' 
                              color='primary' 
                              cursor='pointer'
                              onClick={e=> handlerConfirmEditName(e)}
                /> 
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
                  <button className={style.buttonUpdate} onClick={e=>handlerDeleteAccount(e)}>Dar de baja mi cuenta</button>
                </div>
                
              </div>
            
            </div>

            <div className={`col-lg`}>
            </div>

          </div>
        </div>
      ) : (
        
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            
            <div className={`col-lg-6 ${style.col1}`}>
            
              <div className={`row ${style.row}`}>

                <div className={`col-lg-6 ${style.col3}`}>
                  Mis logros
                </div>

                <div className={`col-lg-6 ${style.col2}`}>
                  <TeachPoints />
                </div>
        
              </div>

              <div className={`row ${style.row}`}>

                <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                  <StatsUser />
                </div>

                <div className={`col-lg-6 ${style.col2}`}>
                  <StatsUser />
                </div>
                
              </div>

              <div className={`row ${style.row}`}>

                <div className={`col-lg-6 ${style.col2} ${style.text}`}>
                  <StatsUser />
                </div>

                <div className={`col-lg-6 ${style.col2}`}>
                  <StatsUser />
                </div>
                
              </div>
            
            </div>


          </div>
        </div>
        // <div className={style.total}>
        //   {/* Acá el contenido para no logueados */}
        //   <div className={`container-fluid ${style.container}`}>
        //     <div className={`row ${style.middleRow}`}>
        //       <div className={`col-lg ${style.colOut}`}>
        //         At vero eos et accusamus et iusto odio dignissimos ducimus qui
        //         blanditiis praesentium voluptatum deleniti atque corrupti quos
        //         dolores et quas molestias excepturi sint occaecati cupiditate
        //         non provident, similique sunt in culpa qui officia deserunt
        //         mollitia animi, id est laborum et dolorum fuga. Et harum quidem
        //         rerum facilis est et expedita distinctio. Nam libero tempore,
        //         cum soluta nobis est eligendi optio cumque nihil impedit quo
        //         minus id quod maxime placeat facere possimus, omnis voluptas
        //         assumenda est, omnis dolor repellendus. Temporibus autem
        //         quibusdam et aut officiis debitis aut rerum necessitatibus saepe
        //         eveniet ut et voluptates repudiandae sint et molestiae non
        //         recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
        //         ut aut reiciendis voluptatibus maiores alias consequatur aut
        //         perferendis doloribus asperiores repellat." "Sed ut perspiciatis
        //         unde omnis iste natus error sit voluptatem accusantium
        //         doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        //         illo inventore veritatis et quasi architecto beatae vitae dicta
        //         sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        //         aspernatur aut odit aut fugit, sed quia consequuntur magni
        //         dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
        //         quisquam est, qui dolorem ipsum quia dolor sit amet,
        //         consectetur, adipisci velit, sed quia non numquam eius modi
        //         tempora incidunt ut labore et dolore magnam aliquam quaerat
        //         voluptatem. Ut enim ad minima veniam, quis nostrum
        //         exercitationem ullam corporis suscipit laboriosam, nisi ut
        //         aliquid ex ea commodi consequatur? Quis autem vel eum iure
        //         reprehenderit qui in ea voluptate velit esse quam nihil
        //         molestiae consequatur, vel illum qui dolorem eum fugiat quo
        //         voluptas nulla pariatur?"
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Configuracion;
