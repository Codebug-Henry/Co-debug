// import { Provider } from "react-redux"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store"
import { Auth0Provider } from "@auth0/auth0-react"
require('dotenv').config();
const {
  REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID
} = process.env;
const domain = REACT_APP_AUTH0_DOMAIN;
const clientId = REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    store={store}
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </Auth0Provider>,
  document.getElementById('root')
);

