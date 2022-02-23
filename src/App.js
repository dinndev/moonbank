import Nav from "./Components/Nav";
import { useState } from "react";
import Usercontrol from "./Components/UserControl";
import ManageExpences from "./Components/ManageExpences";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <div className="App transition-all flex w-screen">
        <Nav />
        <div className="w-4/5 flex m-5">
          <Routes>
            <Route
              path="/account"
              element={
                <>
                  <ManageExpences /> <Usercontrol />
                </>
              }
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
