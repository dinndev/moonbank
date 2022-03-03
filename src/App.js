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
import { ChakraProvider } from "@chakra-ui/react";
import Users from "./Components/Account/Users";

function App() {
  return (
    <TransactionContextProvider initialState={initialState} reducer={reducer}>
      <ChakraProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <div className="App transition-all flex w-screen">
              <div className="w-full items-center justify-between flex h-screen overflow-hidden">
                <Routes>
                  <Route path="moonbank" element={<Login />} />

                  <Route
                    path="moonbank/account"
                    element={
                      <PrivateRoute>
                        <Nav />
                        <ManageExpences />
                        <Usercontrol />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/moonbank/account/users"
                    element={
                      <PrivateRoute>
                        <Nav />
                        <Users />
                      </PrivateRoute>
                    }
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="/moonbank/signup" element={<Signup />} />

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
      </ChakraProvider>
    </TransactionContextProvider>
  );
}

export default App;
