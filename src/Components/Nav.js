import Accountssvg from "./Svg/AccountsSvg";
import AccountSvg from "./Svg/AccountSvg";
import Addaccountsvg from "./Svg/AddAccountSvg";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="w-1/5 bg-navBg h-screen rounded-lg flex flex-col justify-evenly items-center">
      <h1 className=" font-montserratBold h-1/6 flex justify-center items-center text-2xl text-primary">
        MoonBank
      </h1>
      <ul className="flex-1 mt-16 flex flex-col justify-start items-center w-full h-4/5">
        <Link
          className="flex items-center w-6/12 justify-evenly"
          to="moonbank/account"
        >
          <AccountSvg />
          <p className="text-gray-400 text-center text-md font-montserratBold">
            Account
          </p>
        </Link>
        <Link
          className="flex mt-20 mb-20 items-center w-6/12 justify-evenly "
          to="moonbank"
        >
          <Addaccountsvg />

          <p className="text-gray-400 text-center text-md font-montserratBold">
            Create <br /> account
          </p>
        </Link>
      </ul>
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
