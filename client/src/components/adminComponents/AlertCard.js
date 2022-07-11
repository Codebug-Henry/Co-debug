import React from "react";
import style from "./styles/AlertCard.module.css";
import axios from "axios";


const AlertCard = ({id,message,title,text,subCreator,questionSub,questionId,setAlertsFlag,answerId,qStatusDeleted,aStatusDeleted}) => {
  //const [input, setInput] = useState("");
  //const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    if(questionId){
      if(qStatusDeleted) {
        let resolvedPack = { id, statusResolved: true };
        await axios.put(`/alert`, resolvedPack);
        setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
      }
      else {
        let pack = { id: questionId, statusDeleted: true };
        let resolvedPack = { id, statusResolved: true };
        await axios.put(`/alert`, resolvedPack);
        await axios.put(`/question`, pack);
        setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
      }
    }
    if(answerId){
      if(aStatusDeleted){
        let resolvedPack = { id, statusResolved: true };
        await axios.put(`/alert`, resolvedPack);
        setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
      }
      else {
        let pack = { id: answerId, statusDeleted: true };
        let resolvedPack = { id, statusResolved: true };
        await axios.put(`/alert`, resolvedPack);
        await axios.put(`/answer`, pack);
        setAlertsFlag((prevAlertsFlag) => !prevAlertsFlag);
      }

    }
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
          <div className={`col ${style.column}`}>
            <p>{id}</p>
          </div>
          <div className={`col-2 ${style.column}`}>
            <p>{subCreator}</p>
          </div>
          <div className={`col-3 ${style.column}`}>
            <p>{questionSub}</p>
          </div>
          <div className={`col ${style.column}`}>
            <p>{message}</p>
          </div>
          <div className={`col ${style.column}`}>
            <p>{title ? title : "N/C"}</p>
          </div>
          <div className={`col-2 ${style.column}`}>
            <p>{text}</p>
          </div>
          <div className={`col  ${style.column}`}>
            <button
              className={style.buttonBorrar}
              onClick={(e) => handleDelete(e)}
            >
              Borrar
            </button>
          </div>
          <div className={`col ${style.column}`}>
            <button
              className={style.buttonResolver}
              onClick={(e) => handleResolve(e)}
            >
              Resolver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
