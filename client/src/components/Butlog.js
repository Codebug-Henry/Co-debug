import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Butlog = () => {
  const { loginWithRedirect } = useAuth0();

  const handleClick = (e) => {
    e.preventDefault()
    loginWithRedirect({appState: {
      returnTo: window.location.pathname
   }})
  }

  return (
    <button type="button" className="btn btn-warning" onClick={handleClick}>
      Log in/Register
    </button>
  );
};

export default Butlog;