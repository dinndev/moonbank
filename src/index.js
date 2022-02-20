import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Styles/index.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { TransactionContextProvider } from "./States/TransactionContext";
import { initialState, reducer } from "./States/reducer";
import { options } from "./alertOption";
ReactDOM.render(
  <React.StrictMode>
    <TransactionContextProvider initialState={initialState} reducer={reducer}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </TransactionContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
