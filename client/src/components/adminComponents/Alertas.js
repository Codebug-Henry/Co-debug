// import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/Alertas.module.css";
import AlertCard from "./AlertCard";
import Paginated from "../Paginated";

const Alertas = ({ alertsPage, setAlertsPage, setAlertsFlag }) => {
  const alerts = useSelector((state) => state.alerts);
  const totalPages = useSelector((state) => state.totalPages);

  return (
    <div className={style.container}>
      <div className={style.alertList}>
        <div className={`container-fluid ${style.container}`}>
          <div className={`row ${style.info}`}>
            <p className={`col`}>Id</p>
            <p className={`col-2`}>Sub Creador</p>
            <p className={`col-3`}>Sub Pregunta</p>
            <p className={`col`}>Mensaje</p>
            <p className={`col`}>Titulo</p>
            <p className={`col-2`}>Texto</p>
            <p className={`col`}>Borrar</p>
            <p className={`col`}>Resolver</p>
          </div>
        </div>
        <div className={style.alerts}>
          {alerts &&
            alerts.map((e) => {
              return (
                <div className={`row`} key={e.id}>
                  <AlertCard
                    id={e.id}
                    title={e.question.title}
                    text={e.question.text}
                    message={e.message}
                    subCreator={e.subCreator}
                    questionSub={e.question.userSub}
                    questionId={e.question.id}
                    setAlertsFlag={setAlertsFlag}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <Paginated
          page={alertsPage}
          setPage={setAlertsPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Alertas;
