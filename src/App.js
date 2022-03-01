import Nav from "./Components/Nav";
import Usercontrol from "./Components/Account/UserControl";
import ManageExpences from "./Components/Expences/ManageExpences";
import { BrowserRouter, Link, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import { useEffect } from "react";
import { useTransactionContext } from "./States/TransactionContext";

function App() {
  return (
    <div className="App transition-all flex w-screen">
      <Nav />
      <div className="w-4/5  flex m-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
