import Nav from "./Components/Nav";
import Usercontrol from "./Components/UserControl";
import ManageExpences from "./Components/ManageExpences";

function App() {
  return (
    <div className="App transition-all flex w-screen">
      <Nav />
      <div className="userInfo w-4/5 flex m-5">
        <ManageExpences />
        <Usercontrol />
      </div>
    </div>
  );
}

export default App;
