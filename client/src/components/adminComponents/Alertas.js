import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Alertas.module.css";
import AlertCard from "./AlertCard";
import Paginated from "../Paginated";
import Footer from "../Footer";
import { getAllAlerts } from "../../redux/actions";
import BotonesAdmin from "./BotonesAdmin";
import NotFound from "../../pages/NotFound";

const Alertas = () => {
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsFlag, setAlertsFlag] = useState(true);
  const user = useSelector(state => state.user)
  const totalPages = useSelector((state) => state.totalPages);
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [alertasOn, setAlertasOn] = useState(true);

  const dark = useSelector((state)=> state.dark)

  const darkmode = {
    backgroundColor: dark ? "rgb(18, 18, 18)" : "lightyellow"
  }

  const darkInfo = {
    backgroundColor: dark ? "rgb(24, 27, 56)" : null,
    color: dark ? "rgb(218, 219, 227)" : null
  }


  useEffect(() => {
    if (alertsPage > 1 && alertsPage > totalPages) {
      setAlertsPage((prev) => prev - 1);
    }
    dispatch(getAllAlerts(alertsPage));
  }, [dispatch, alertsPage, alertsFlag, totalPages]);

  if(user.statusAdmin) {
    return (
      <div style={darkmode}>
        <div>
          <BotonesAdmin 
          alertasOn={alertasOn}
          />
        </div>
        <div className={style.container} >
          <div className={style.alertList}>
            <div className={`container-fluid ${style.container}`}>
              <div className={`row ${style.info}`} style={darkInfo}>
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
            {alerts.length > 0 && (
              <Paginated setPage={setAlertsPage} page={alertsPage} />
            )}
          </div>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    )
  } else {
    return (
      <>
        <NotFound />
      </>
    )
  }
};

export default Alertas;
