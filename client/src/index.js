import { Provider } from "react-redux"
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history.js'
import ReactDOMClient from "react-dom/client"
import App from './App';
import store from "./redux/store"
import axios from 'axios';
require('dotenv').config();

const container = document.getElementById("root")
const root = ReactDOMClient.createRoot(container);

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

root.render(
<BrowserRouter>
  <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
</BrowserRouter>
);