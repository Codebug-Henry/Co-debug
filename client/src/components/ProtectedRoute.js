import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import Loading from "./Loading";

export default function ProtectedRoute({ component }) {
  let url = window.location.pathname

  const Component = withAuthenticationRequired(component, {
    returnTo: url,
    onRedirecting: () => <Loading />
  });

  return <Component />;
};