import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Butlog = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      type="button"
      className="btn btn-warning"
      onClick={() => loginWithRedirect()}
    >
      Log in/Register
    </button>
  );
};

export default Butlog;
