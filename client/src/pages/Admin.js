import React from "react";
import Footer from "../components/Footer.js";
import style from "./styles/Admin.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BotonesAdmin from "../components/adminComponents/BotonesAdmin.js";

const Admin = () => {
  const isAuthenticated = true;
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      {isAuthenticated ? (
        <div className={style.row}>
          {userInfo.statusAdmin ? (
            <div>
              <p className={style.title}>Admin options</p>
              <BotonesAdmin />
              <p className={style.lowertitle}>Elegir la opción deseada</p>
            </div>
          ) : (
            <div>{navigate("/")}</div>
          )}
        </div>
      ) : (
        <div>{navigate("/")}</div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
