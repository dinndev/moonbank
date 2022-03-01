import React from "react";
import ReactDOM from "react-dom";
import Usercontrol from "./Components/UserControl";
import ManageExpences from "./Components/ManageExpences";
import Signup from "./Components/Signup";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Styles/index.css";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { TransactionContextProvider } from "./States/TransactionContext";
import { initialState, reducer } from "./States/reducer";
import { options } from "./alertOption";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Components/Route/PrivateRoute";
import { useTransactionContext } from "./States/TransactionContext";
ReactDOM.render(
  <React.StrictMode>
    <TransactionContextProvider initialState={initialState} reducer={reducer}>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Routes>
            <Route path="moonbank" element={<App />}>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Bonk! There's nothing here!</p>
                  </main>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="account"
                element={
                  <PrivateRoute>
                    <ManageExpences />
                    <Usercontrol />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </TransactionContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
