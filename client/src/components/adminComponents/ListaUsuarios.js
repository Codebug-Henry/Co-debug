import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import style from "./styles/ListaUsuarios.module.css";
import PaginatedAdmin from "../PaginatedAdmin";
import { useEffect, useState } from "react";
import BotonesAdmin from "./BotonesAdmin";
import { getAllUsers } from "../../redux/actions";

const ListaUsuarios = () => {
  const users = useSelector((state) => state.users);
  const totalPages = useSelector((state)=> state.totalPages);
  const dispatch = useDispatch()
  
  const [usersFlag, setUsersFlag] = useState(true)
  const [usersPage, setUsersPage] = useState(1)
  const [banFlag, setBanFlag] = useState(true)

  useEffect(()=>{
    if (usersPage > 1 && usersPage > totalPages) {
      setUsersPage((prev) => prev - 1);
    }
    dispatch(getAllUsers(usersPage))
  },[dispatch, usersFlag, usersPage, totalPages, banFlag])

  return (
    <div>
      <div>
        <BotonesAdmin/>
      </div>
      <div className={`container-fluid ${style.container}`}>
        <div className={`row ${style.info}`}>
          <p className={`col-2`}>Nickname</p>
          <p className={`col-3`}>Sub id</p>
          <p className={`col-2`}>Email</p>
          <p className={`col-1`}>Ciudad</p>
          <p className={`col`}>Preg</p>
          <p className={`col`}>Res</p>
          <p className={`col`}>Points</p>
          <p className={`col`}>Ban</p>
          <p className={`col`}>Banear</p>
        </div>
        {users ? (
          <>
            {users?.map((e) => {
              return (
                <div className={`row`} key={e.sub}>
                  <UserCard
                    cantAns={e.cantAns}
                    cantQuest={e.cantQuest}
                    email={e.email}
                    locale={e.locale}
                    nickname={e.nickname}
                    statusBanned={e.statusBanned}
                    sub={e.sub}
                    points={e.myTeachPoints}
                    setUsersFlag={setUsersFlag}
                    setBanFlag={setBanFlag}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div>No se encontraron usuarios</div>
        )}
          <PaginatedAdmin
            setPage={setUsersPage}
            page={usersPage}
          />
      </div>
    </div>
  );
};

export default ListaUsuarios;
