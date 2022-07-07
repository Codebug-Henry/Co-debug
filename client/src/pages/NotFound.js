import React from "react";
import Footer from "../components/Footer.js";
import style from "./styles/NotFound.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading.js";

const NotFound = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className={style.fullContainer}>
        <p className="display-4">Ups.. Página no encontrada</p>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
