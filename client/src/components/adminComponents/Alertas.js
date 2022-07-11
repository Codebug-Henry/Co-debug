import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Alertas.module.css";
import AlertCard from "./AlertCard";
import Paginated from "../Paginated";
import Footer from "../Footer";
import { getAllAlerts } from "../../redux/actions";
import BotonesAdmin from "./BotonesAdmin";

const Alertas = () => {
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsFlag, setAlertsFlag] = useState(true);
  const totalPages = useSelector((state) => state.totalPages);
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (alertsPage > 1 && alertsPage > totalPages) {
      setAlertsPage((prev) => prev - 1);
    }
    dispatch(getAllAlerts(alertsPage));
  }, [dispatch, alertsPage, alertsFlag, totalPages]);

  return (
    <div>
      <div>
        <BotonesAdmin />
      </div>
      <div className={style.container}>
        <div className={style.alertList}>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.info}`}>
              <p className={`col`}>Id</p>
              <p className={`col-2`}>Sub creador alerta</p>
              <p className={`col-3`}>Sub pregunta / respuesta</p>
              <p className={`col`}>Tipo alerta</p>
              <p className={`col`}>Título</p>
              <p className={`col-2`}>Texto</p>
              <p className={`col`}>Borrar</p>
              <p className={`col`}>Resolver</p>
            </div>
          </div>
          <div className={style.alerts}>
            {alerts ? (
              <>
                {alerts?.map((e) => {
                  return (
                    <div className={`row ${style.data}`} key={e.id}>
                      <AlertCard
                        id={e.id}
                        title={e.questionId ? e.question.title : null}
                        text={e.questionId ? e.question.text : e.answer.text}
                        message={e.message}
                        subCreator={e.subCreator}
                        questionSub={
                          e.questionId ? e.question.userSub : e.answer.userSub
                        }
                        questionId={e.questionId ? e.question.id : null}
                        answerId={e.answerId ? e.answer.id : null}
                        qStatusDeleted={
                          e.questionId ? e.question.statusDeleted : null
                        }
                        aStatusDeleted={
                          e.answerId ? e.answer.statusDeleted : null
                        }
                        setAlertsFlag={setAlertsFlag}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
        <div>
          <Paginated setPage={setAlertsPage} page={alertsPage} />
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Alertas;
