import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/AgregarAdmin.module.css";
import AdminCard from "./AdminCard";
import Paginated from "../Paginated";
import Footer from "../Footer";
import {
  getAllAdmins,
  getAllUsersNoAdmin,
  getSearchUsers,
} from "../../redux/actions";
import UserAdminCard from "./UserAdminCard";
import BotonesAdmin from "./BotonesAdmin";

const AgregarAdmin = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const [input, setInput] = useState("");
  const usersNoAdmin = useSelector((state) => state.usersNoAdmin);
  const totalPages = useSelector((state) => state.totalPages);

  const [adminFlag, setAdminFlag] = useState(true);
  const [adminsPage, setAdminsPage] = useState(1);

  useEffect(() => {
    if (adminsPage > 1 && adminsPage > totalPages) {
      setAdminsPage((prev) => prev - 1);
    }
    if (input === "") {
      dispatch(getAllAdmins(adminsPage));
      dispatch(getAllUsersNoAdmin(adminsPage));
    }
  }, [dispatch, adminFlag, adminsPage, totalPages, input]);

  const onChangeSearch = (e) => {
    setInput(e.target.value);
    dispatch(getSearchUsers(1, e.target.value));
  };

  const handlerRefresh = (e) => {};

  return (
    <div className={style.supercontainer}>
      <div>
        <BotonesAdmin />
      </div>
      <div>
        <div className={style.adminList}>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.info}`}>
              <p className={"col"}>Admin(nick)</p>
              <p className={"col"}>Sub</p>
              <p className={"col"}>Email</p>
              <p className={"col"}>Quitar</p>
            </div>
          </div>
          <div className={style.adminRenders}>
            {admins &&
              admins.map((admin) => {
                return (
                  <div className={`row ${style.dataAdmin}`} key={admin.sub}>
                    <AdminCard
                      className={style.AdminCard}
                      sub={admin.sub}
                      nickname={admin.nickname}
                      email={admin.email}
                      setAdminFlag={setAdminFlag}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className={style.addAdmin}>
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
          <div className={style.allUsers}>
            <div className={`container-fluid ${style.container}`}>
              <div className={`row ${style.info}`}>
                <p className={"col"}>User(nick)</p>
                <p className={"col"}>Sub</p>
                <p className={"col"}>Email</p>
                <p className={"col"}>Agregar</p>
              </div>
              <div>
                <div className={style.adminRenders}>
                  {usersNoAdmin.length > 0 ?
                    usersNoAdmin.map((user) => {
                      return (
                        <div
                          className={`row ${style.dataUsers}`}
                          key={user.sub}
                        >
                          <UserAdminCard
                            sub={user.sub}
                            nickname={user.nickname}
                            email={user.email}
                            setAdminFlag={setAdminFlag}
                          />
                        </div>
                      );
                    }) : (
                      <div className={style.notFound}>No se encontraron usuarios</div>
                    )
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {usersNoAdmin.length > 0 && (
            <Paginated setPage={setAdminsPage} page={adminsPage} />
          )}
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default AgregarAdmin;
