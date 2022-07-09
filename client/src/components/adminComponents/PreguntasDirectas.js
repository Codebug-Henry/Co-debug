import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import style from "./styles/PreguntasDirectas.module.css";
import PaginatedAdmin from "../PaginatedAdmin";

const PreguntasDirectas = ({ messagePage, setMessagePage, setMessageFlag }) => {
  const messages = useSelector((state) => state.messages);
  const pages = useSelector((state) => state.pages3);

  return (
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
        <PaginatedAdmin
          setPage={setMessagePage}
          pages={pages}
        />
      </div>
    </div>
  );
};

export default PreguntasDirectas;
