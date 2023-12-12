import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

ReactDom.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App></App>
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
