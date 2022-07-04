import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import style from "./styles/ListaUsuarios.module.css";
import Paginated from "../Paginated";

const ListaUsuarios = ({ setBanFlag, setUsersPage, usersPage }) => {
  const users = useSelector((state) => state.users);

  const totalPages = useSelector((state) => state.totalPages);

  console.log("Lista", users);
  return (
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
