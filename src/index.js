import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "../src/component/App"
import { register } from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/index";
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import "./index.css"
render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
register();