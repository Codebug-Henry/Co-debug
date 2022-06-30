import React from "react";
import style from "./styles/UserAdminCard.module.css";
import axios from "axios";

const UserAdminCard = ({
  sub,
  nickname,
  email,
  setFlag,
  setNoAdminFlag
}) => {
  //const dispatch = useDispatch();

  const addAdmin = (e) => {
    e.preventDefault();
    let modify = { statusAdmin: true };
    axios
      .put(`http://localhost:3001/user/${sub}`, modify)
      .then((response) => setNoAdminFlag((prevNoAdminFlag) => !prevNoAdminFlag));

  };

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row}`}>
        <div className={`col-lg ${style.column}`}>
          <p>{nickname}</p>
        </div>
        <div className={`col-lg ${style.column}`}>
          <p>{sub}</p>
        </div>
        <div className={`col-lg ${style.column}`}>
          <p>{email}</p>
        </div>
        <div className={`col-lg  ${style.column}`}>
          <button
            className={style.button}
            onClick={(e) => addAdmin(e)}
          >
            Agregar Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminCard;
