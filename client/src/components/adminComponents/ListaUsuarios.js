//import { User } from "@auth0/auth0-react";
//import axios from "axios";
//import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import { getAllUsers, deleteUser } from "../../redux/actions";
import UserCard from "./UserCard";
import style from "./styles/ListaUsuarios.module.css";
import Paginated from "../Paginated";

const ListaUsuarios = ({ setBanFlag, setUsersPage, usersPage }) => {
  const users = useSelector((state) => state.users);
  //const pages = useSelector((state) => state.pages);
  const totalPages = useSelector((state) => state.totalPages);
  //const dispatch = useDispatch();

  // const handleClick = (e)=>{
  //   e.preventDefault()
  //   setFlag(prevFlag => !prevFlag)
  //   dispatch(deleteUser(3))
  // }

  console.log("Lista", users);
  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.info}`}>
        <p className={`col-lg-2`}>Nickname</p>
        <p className={`col-lg-3`}>Sub id</p>
        <p className={`col-lg-2`}>Email</p>
        <p className={`col-lg-1`}>Ciudad</p>
        <p className={`col-lg`}>Preg</p>
        <p className={`col-lg`}>Res</p>
        <p className={`col-lg`}>Points</p>
        <p className={`col-lg`}>Ban</p>
        <p className={`col-lg`}>Banear</p>
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
                  // setFlag={setFlag}
                  setBanFlag={setBanFlag}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div>No se encontraron usuarios</div>
      )}
      <Paginated
        page={usersPage}
        setPage={setUsersPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ListaUsuarios;
