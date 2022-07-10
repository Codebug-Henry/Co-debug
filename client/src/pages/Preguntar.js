import React from "react";
import style from "./styles/Preguntar.module.css";
import Footer from "../components/Footer.js";
import FormQuestion from "../components/FormQuestion";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getNotifications } from "../redux/actions";
import NotVerified from "../components/NotVerified";
import BannedUser from "../components/BannedUser";

const Preguntar = () => {
  const { isLoading, user } = useAuth0();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications(user.sub));
  }, [dispatch, user]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else if (user.email_verified === false) {
    return (
      <>
        <NotVerified />
      </>
    );
  } else if (userInfo.statusBanned === true) {
    return (
      <>
        <BannedUser />
      </>
    );
  } else
    return (
      <div className={style.fullContainer}>
        <div className={style.middleRow}>
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.col1}`}>
                <FormQuestion />
              </div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    );
};

export default Preguntar;
