import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/AgregarAdmin.module.css";
import AdminCard from "./AdminCard";
import { getSearchUsers } from "../../redux/actions";
import UserAdminCard from "./UserAdminCard";

const AgregarAdmin = ({ setAdminFlag, setNoAdminFlag }) => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const [input, setInput] = useState("");
  const usersNoAdmin = useSelector((state) => state.usersNoAdmin);

  const onChangeSearch = (e) => {
    setInput(e.target.value);
    dispatch(getSearchUsers(1, input));
    setNoAdminFlag((prevNoAdminFlag) => !prevNoAdminFlag);
  };

  const handlerRefresh = (e) => {};

  return (
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
                <div className={`row`} key={admin.sub}>
                  <AdminCard
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
                {usersNoAdmin &&
                  usersNoAdmin.map((user) => {
                    return (
                      <div className={`row`} key={user.sub}>
                        <UserAdminCard
                          sub={user.sub}
                          nickname={user.nickname}
                          email={user.email}
                          setAdminFlag={setAdminFlag}
                          setNoAdminFlag={setNoAdminFlag}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarAdmin;
