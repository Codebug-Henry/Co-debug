import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Footer from "../Footer";
import style from "./styles/PreguntasDirectas.module.css";
import { getAllMessages } from "../../redux/actions";
import BotonesAdmin from "./BotonesAdmin";
import Paginated from "../Paginated";
import NotFound from "../../pages/NotFound";

const PreguntasDirectas = () => {
  const messages = useSelector((state) => state.messages);
  const totalPages = useSelector((state) => state.totalPages);
  const user = useSelector(state => state.user)

  const dispatch = useDispatch();

  const [messagePage, setMessagePage] = useState(1);
  const [messageFlag, setMessageFlag] = useState(true);
  // eslint-disable-next-line
  const [preguntasOn, setPreguntasOn] = useState(true);

  useEffect(() => {
    if (messagePage > 1 && messagePage > totalPages) {
      setMessagePage((prev) => prev - 1);
    }
    dispatch(getAllMessages(messagePage));
  }, [dispatch, messagePage, messageFlag, totalPages]);

  const dark = useSelector((state)=> state.dark)

  const darkmode = {
    backgroundColor: dark ? "rgb(18, 18, 18)" : "lightyellow"
  }

  if(user.statusAdmin) {
    return (
      <div style={darkmode}>
        <div>
          <BotonesAdmin 
          preguntasOn={preguntasOn}
          />
        </div>
        <div className={style.container}>
          <div>
            {messages &&
              messages.map((e) => {
                return (
                  <Message
                    key={e.id}
                    title={e.title}
                    text={e.text}
                    email={e.email}
                    id={e.id}
                    setMessageFlag={setMessageFlag}
                  />
                );
              })}
          </div>
          <div>
            {messages.length > 0 && (
              <Paginated setPage={setMessagePage} page={messagePage} />
            )}
          </div>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <NotFound />
      </>
    )
  }
};

export default PreguntasDirectas;
