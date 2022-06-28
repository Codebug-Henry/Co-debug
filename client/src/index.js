import { Provider } from "react-redux"
import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOMClient from "react-dom/client"
import App from './App';
import store from "./redux/store"
import axios from 'axios';
import { Auth0Provider } from "@auth0/auth0-react"
require('dotenv').config();
const {
  REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_API
} = process.env;
const domain = REACT_APP_AUTH0_DOMAIN;
const clientId = REACT_APP_AUTH0_CLIENT_ID;

const container = document.getElementById("root")
const root = ReactDOMClient.createRoot(container);

axios.defaults.badeURL = REACT_APP_API || "http://localhost:3001"

root.render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>//,
//  document.getElementById('root')
);