import AccountSvg from "./Svg/AccountSvg";
import Addaccountsvg from "./Svg/AddAccountSvg";
import { Link } from "react-router-dom";
import { useTransactionContext } from "../States/TransactionContext";
import { useLocation } from "react-router";
const Nav = () => {
  const [{ user, isLoggedIn }, dispatch] = useTransactionContext();
  const logout = () => {
    dispatch({
      type: "SET_USER",
      user: {},
    });
    localStorage.removeItem("User");
    dispatch({
      type: "TOGGLE_LOGIN",
      isLoggedIn: false,
    });
  };
  return (
    <nav className="w-1/5 bg-navBg h-screen rounded-lg flex flex-col justify-evenly items-center">
      <h1 className=" font-montserratBold h-1/6 flex justify-center items-center text-2xl text-primary">
        MoonBank
      </h1>
      <ul className="flex-1 mt-16 flex flex-col justify-start items-center w-full h-4/5">
        <Link
          className="flex items-center w-6/12 justify-evenly"
          to={`account`}
        >
          <AccountSvg />
          <p className="text-gray-400 text-center text-md font-montserratBold">
            Account
          </p>
        </Link>
        <Link
          className="flex mt-20 mb-20 items-center w-6/12 justify-evenly "
          to="signup"
        >
          <Addaccountsvg />

          <p className="text-gray-400 text-center text-md font-montserratBold">
            Create <br /> account
          </p>
        </Link>
        <Link
          className="flex mb-20 items-center w-6/12 justify-evenly "
          to="moonbank"
        >
          <AccountSvg />

          <p className="text-gray-400 text-center text-md font-montserratBold">
            Friends
          </p>
        </Link>
      </ul>
      {isLoggedIn ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <Link
          to="login"
          className="mb-10 lg  text-lg font-montserratBold  text-secondary"
        >
          Login
        </Link>
      )}

      <div className="border-t-2 w-5/6 h-footerHeight flex justify-center items-center bot">
        <p className="text-xs text-gray-400">
          Developed by
          <span className="text-secondary font-robotoSemiBold text-xs">
            <a href="https://github.com/dinndev"> dinndev</a>
          </span>
        </p>
      </div>
    </nav>
  );
};

export default Nav;
