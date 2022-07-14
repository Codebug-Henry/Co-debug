import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import style from "./styles/ListaUsuarios.module.css";
import Paginated from "../Paginated";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import BotonesAdmin from "./BotonesAdmin";
import { getSearchUsers, getAllUsersNoAdmin } from "../../redux/actions";

const ListaUsuarios = () => {
  const usersNoAdmin = useSelector((state) => state.usersNoAdmin);
  const totalPages = useSelector((state) => state.totalPages);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.dark);
  // eslint-disable-next-line
  const [usuariosOn, setListaUsuariosOn] = useState(true);

  const darkmode = {
    backgroundColor: dark ? "rgb(18, 18, 18)" : "lightyellow",
  };

  const darkSearchbar = {
    border: dark ? "none" : null,
    backgroundColor: dark ? "rgb(218, 219, 227)" : null,
  };

  const darkRefresh = {
    border: dark ? "none" : null,
    backgroundColor: dark ? "lightyellow" : null,
    color: dark ? "black" : null,
  };

  const darkInfo = {
    backgroundColor: dark ? "rgb(24, 27, 56)" : null,
    color: dark ? "rgb(218, 219, 227)" : null,
  };

  const [usersFlag, setUsersFlag] = useState(true);
  const [usersPage, setUsersPage] = useState(1);
  const [banFlag, setBanFlag] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (usersPage > 1 && usersPage > totalPages) {
      setUsersPage((prev) => prev - 1);
    }
    if (input === "") {
      dispatch(getAllUsersNoAdmin(usersPage));
    }
  }, [dispatch, usersFlag, usersPage, totalPages, banFlag, input]);

  const onChangeSearch = (e) => {
    setInput(e.target.value);
    dispatch(getSearchUsers(1, e.target.value));
  };

  const handlerRefresh = (e) => {};

  return (
    <div>
      <div>
        <BotonesAdmin usuariosOn={usuariosOn} />
      </div>
      <div style={darkmode}>
        <div>
          <form className="d-flex">
            <input
              onChange={(e) => onChangeSearch(e)}
              className={`form-control me-2 ${style.input}`}
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
              style={darkSearchbar}
              value={input}
            />
            <button
              onClick={() => handlerRefresh()}
              className={`btn btn-outline-dark ${style.button}`}
              type="submit"
              style={darkRefresh}
            >
              Refresh
            </button>
          </form>
        </div>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.info}`} style={darkInfo}>
            <p className={`col-2 ${style.col}`}>Nickname</p>
            <p className={`col-3 ${style.col}`}>Sub id</p>
            <p className={`col-2 ${style.col}`}>Email</p>
            <p className={`col-1 ${style.col}`}>Origen</p>
            <p className={`col ${style.col}`}>Preg</p>
            <p className={`col ${style.col}`}>Res</p>
            <p className={`col ${style.col}`}>Points</p>
            <p className={`col ${style.col}`}>Ban</p>
            <p className={`col ${style.col}`}>Banear</p>
          </div>
          {usersNoAdmin.length > 0 ? (
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
                      setInput={setInput}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className={style.notFound}>No se encontraron usuarios</div>
          )}
        </div>
        <div>
          {usersNoAdmin.length > 0 && (
            <Paginated setPage={setUsersPage} page={usersPage} />
          )}
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ListaUsuarios;
