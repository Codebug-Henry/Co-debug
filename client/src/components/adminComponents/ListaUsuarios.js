import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import style from "./styles/ListaUsuarios.module.css";
import Paginated from "../Paginated";
import Footer from "../Footer";

import { useEffect, useState } from "react";
import BotonesAdmin from "./BotonesAdmin";
import { getSearchUsers, getAllUsersNoAdmin } from "../../redux/actions";

const ListaUsuarios = () => {
  // const users = useSelector((state) => state.users);
  const usersNoAdmin = useSelector((state) => state.usersNoAdmin);
  const totalPages = useSelector((state) => state.totalPages);
  const dispatch = useDispatch();

  const [usersFlag, setUsersFlag] = useState(true);
  const [usersPage, setUsersPage] = useState(1);
  const [banFlag, setBanFlag] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (usersPage > 1 && usersPage > totalPages) {
      setUsersPage((prev) => prev - 1);
    }
    dispatch(getAllUsersNoAdmin(usersPage));
    // dispatch(getAllUsers(usersPage));
  }, [dispatch, usersFlag, usersPage, totalPages, banFlag]);

  const onChangeSearch = (e) => {
    setInput(e.target.value);
    dispatch(getSearchUsers(1, e.target.value));
  };

  const handlerRefresh = (e) => {};

  return (
    <div>
      <div>
        <BotonesAdmin />
      </div>

      <div>
        <form className="d-flex">
          <input
            onChange={(e) => onChangeSearch(e)}
            className={`form-control me-2 ${style.input}`}
            type="search"
            placeholder="Buscar..."
            aria-label="Search"
          />
          <button
            onClick={() => handlerRefresh()}
            className={`btn btn-outline-dark ${style.button}`}
            type="submit"
          >
            Refresh
          </button>
        </form>
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
        {usersNoAdmin ? (
          <>
            {usersNoAdmin?.map((e) => {
              return (
                <div className={`row ${style.data}`} key={e.sub}>
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

          {
            users.length > 0 &&
            <Paginated
            setPage={setUsersPage}
            page={usersPage}
          />
          }
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ListaUsuarios;
