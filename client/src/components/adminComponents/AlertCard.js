import React from "react";
import style from "./styles/AlertCard.module.css";
// import { useDispatch } from "react-redux";
import axios from "axios";

const AlertCard = ({id,message,title,text,subCreator,questionSub,questionId,setAlertsFlag,setTemporalFlag}) => {
  //const [input, setInput] = useState("");
  //const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    let pack = { id: questionId, statusDeleted: true };
    let resolvedPack = { id, statusResolved: true };
    await axios.put(`/alert`, resolvedPack);
    await axios.put(`/question`, pack);
    setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
  };

  const handleResolve = async (e) => {
    e.preventDefault();
    let pack = { id, statusResolved: true };
    await axios.put(`/alert`, pack);
    setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
  };

  return (
    <div>
      <div className={`container-fluid ${style.container}`}>
        <div className={`row ${style.row}`}>
          <div className={`col-lg ${style.column}`}>
            <p>{id}</p>
          </div>
          <div className={`col-lg-3 ${style.column}`}>
            <p>{subCreator}</p>
          </div>
          <div className={`col-lg-3 ${style.column}`}>
            <p>{questionSub}</p>
          </div>
          <div className={`col-lg ${style.column}`}>
            <p>{message}</p>
          </div>
          <div className={`col-lg ${style.column}`}>
            <p>{title}</p>
          </div>
          <div className={`col-lg ${style.column}`}>
            <p>{text}</p>
          </div>
          <div className={`col-lg  ${style.column}`}>
            <button className={style.button} onClick={(e) => handleDelete(e)}>
              Borrar
            </button>
          </div>
          <div className={`col-lg  ${style.column}`}>
            <button className={style.button} onClick={(e) => handleResolve(e)}>
              Resolver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
