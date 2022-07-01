import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import style from "./styles/PreguntasDirectas.module.css";
import Paginated from "../Paginated";

const PreguntasDirectas = ({ messagePage, setMessagePage }) => {
  const messages = useSelector((state) => state.messages);
  const totalPages = useSelector((state) => state.totalPages);
  console.log(messages);
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
              />
            );
          })}
      </div>
      <div>
        <Paginated
          page={messagePage}
          setPage={setMessagePage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default PreguntasDirectas;
