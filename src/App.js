import Nav from "./Components/Nav";
import ManageExpences from "./Components/Expences/ManageExpences";
import { TransactionContextProvider } from "./States/TransactionContext";
import { initialState, reducer } from "./States/reducer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Usercontrol from "./Components/Account/UserControl";
import { options } from "./alertOption";
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/Route/PrivateRoute";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  return (
    <TransactionContextProvider initialState={initialState} reducer={reducer}>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <div className="App transition-all flex w-screen">
            <Nav />
            <div className="w-4/5  flex m-5">
              <Routes>
                <Route path="moonbank" element={<Signup />} />
                <Route
                  path="moonbank/account"
                  element={
                    <PrivateRoute>
                      <ManageExpences />
                      <Usercontrol />
                    </PrivateRoute>
                  }
                />
                <Route path="moonbank/login" element={<Login />} />
                <Route path="moonbank/signup" element={<Signup />} />

                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>Bonk! There's nothing here!</p>
                    </main>
                  }
                />
              </Routes>
              <Outlet />
            </div>
          </div>
        </BrowserRouter>
      </AlertProvider>
    </TransactionContextProvider>
  );
}

export default App;
