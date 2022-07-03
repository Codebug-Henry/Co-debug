import React from "react";
import style from "./styles/AlertCard.module.css";
// import { useDispatch } from "react-redux";
import axios from "axios";

const AlertCard = ({
  id,
  message,
  title,
  text,
  subCreator,
  questionSub,
  questionId,
  setAlertsFlag,
  setTemporalFlag,
}) => {
  //const [input, setInput] = useState("");
  //const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    let pack = { id: questionId, statusDeleted: true };
    let resolvedPack = { id, statusResolved: true };
    axios
      .put(`http://localhost:3001/alert`, resolvedPack)
      .then((r) => alert("Alerta resuelta"));
    axios
      .put(`http://localhost:3001/question`, pack)
      .then((r) => alert("Pregunta borrada"));
    setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
    setTemporalFlag((prevTemporalFlag) => !prevTemporalFlag);
  };

  const handleResolve = (e) => {
    e.preventDefault();
    let pack = { id, statusResolved: true };
    axios
      .put(`http://localhost:3001/alert`, pack)
      .then((r) => alert("Alerta resuelta"));
    setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
    setTemporalFlag((prevTemporalFlag) => !prevTemporalFlag);
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
