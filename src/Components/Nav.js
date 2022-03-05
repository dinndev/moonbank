import AccountSvg from "./Svg/AccountSvg";
import Friendssvg from "./Svg/FriendsSvg";
import { useEffect } from "react";
import Addaccountsvg from "./Svg/AddAccountSvg";
import { Link } from "react-router-dom";
import { useTransactionContext } from "../States/TransactionContext";
import { useLocation } from "react-router";
const Nav = () => {
  const [{ user, isLoggedIn, expenceList, accounts }, dispatch] =
    useTransactionContext();
  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(accounts));
  }, [accounts]);
  const pathLocation = useLocation();
  const logout = () => {
    dispatch({
      type: "SET_USER",
      user: {},
    });
    dispatch({
      type: "UPDATE_ACCOUNTS",
      updatedUser: user,
    });
    // reset the expence list from state
    dispatch({
      type: "SET_EXPENCE_LIST",
      expenceList: [],
    });
    dispatch({
      type: "TOGGLE_LOGIN",
      isLoggedIn: false,
    });
    localStorage.removeItem("User");
  };

  return (
    <nav className="w-1/5 bg-navBg h-screen rounded-lg flex flex-col justify-evenly items-center">
      <h1 className=" font-montserratBold h-1/6 flex justify-center items-center text-2xl text-primary">
        MoonBank
      </h1>
      <ul className="flex-1 mt-16 flex flex-col justify-start items-center w-full h-4/5">
        <Link
          className="flex  items-center w-6/12 justify-evenly"
          to={`/moonbank/account`}
        >
          <AccountSvg
            color={`${
              pathLocation.pathname === "/moonbank/account"
                ? "text-primary"
                : "text-gray-400"
            }`}
          />
          <p
            className={`transition-all text-center text-md font-montserratBold ${
              pathLocation.pathname === "/moonbank/account"
                ? "text-primary"
                : "text-gray-400"
            }`}
          >
            Account
          </p>
        </Link>

        <Link
          className="flex my-10  items-center w-6/12 justify-evenly "
          to="/moonbank/account/users"
        >
          <Friendssvg
            color={`${
              pathLocation.pathname === "/moonbank/account/users"
                ? "text-primary"
                : "text-gray-400"
            }`}
          />

          <p
            className={`transition-all text-center text-md font-montserratBold ${
              pathLocation.pathname === "/moonbank/account/users"
                ? "text-primary"
                : "text-gray-400"
            }`}
          >
            Users
          </p>
        </Link>
      </ul>

      <button
        className="mb-10 lg text-lg font-montserratBold text-red-400"
        onClick={logout}
      >
        Log out
      </button>

      <div className="border-t-2 w-5/6 h-footerHeight flex justify-center items-center bot">
        <p className="text-xs text-gray-400">
          Source code at
          <span className="text-secondary font-robotoSemiBold text-xs">
            <a href="https://github.com/dinndev/moonbank"> Github</a>
          </span>
        </p>
      </div>
    </nav>
  );
};

export default Nav;
