import axios from "axios";
import { useSelector } from "react-redux";
import style from "./styles/AdminCard.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminCard = ({ sub, nickname, email, setAdminFlag, setNoAdminFlag }) => {
  const removeAdmin = (e) => {
    e.preventDefault();
    let modify = { statusAdmin: false };
    axios
      .put(`/user/${sub}`, modify)
      .then((response) => setAdminFlag((prevAdminFlag) => !prevAdminFlag));
  };

  const confirmChange = (e) => {
    confirmAlert({
      title: "Quitará status de Admin",
      message: "¿Está seguro?",
      buttons: [
        {
          label: "Sí",
          onClick: () => removeAdmin(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const dark = useSelector((state) => state.dark);

  const darkmode = {
    backgroundColor: dark ? "rgb(11, 13, 43)" : null,
    color: dark ? "rgb(199, 199, 201)" : null,
    boxShadow: "0px 0px 2px white",
    border: dark ? "none" : null,
    marginBottom: dark ? "0.8vh" : null,
  };

  return (
    <div>
      <div className={`container-fluid ${style.container}`} style={darkmode}>
        <div className={`row ${style.row}`}>
          <div className={`col ${style.column}`}>
            <p>{nickname}</p>
          </div>
          <div className={`col ${style.column}`}>
            <p>{sub}</p>
          </div>
          <div className={`col ${style.column}`}>
            <p>{email}</p>
          </div>
          <div className={`col ${style.column}`}>
            <button className={style.button} onClick={(e) => confirmChange(e)}>
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
