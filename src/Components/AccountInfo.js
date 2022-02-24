import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "../States/TransactionContext";
import { useEffect } from "react";
import Accmoneysvg from "./Svg/AccMoneySvg";
import Expencessvg from "./Svg/ExpencesSvg";
const Accountinfo = () => {
  const [{ totalFunds, totalExpence, account, user }, dispatch] =
    useTransactionContext();
  const logout = () => {
    dispatch({
      type: "SET_USER",
      user: {},
    });
    localStorage.removeItem("User");
  };
  return (
    <div className="w-full h-2/3 flex flex-col justify-center items-start">
      <div className="  h-2/4 w-full flex flex-col justify-center">
        <h1 className="text-gray-600 font-robotoSemiBold text-4xl">
          {user.userName}
        </h1>
        <CurrencyFormat
          className="text-primary font-montserratBold mt-2 text-sm"
          value={user.id}
          displayType={"text"}
          format="#### #### #### ####"
        />
        <button
          className="mt-5 text-red-400 font-montserratBold text-sm w-14 text-left"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className=" w-full h-1/2 flex justify-start items-center ">
        <div className="flex w-44 justify-between mr-5">
          <div className="circle rounded-full w-14 h-14 bg-cardBg flex items-center justify-center">
            <Accmoneysvg />
          </div>
          <div className="amount flex flex-col justify-center items-center">
            <CurrencyFormat
              className="text-xl font-bold font-robotoSemiBold text-gray-700"
              value={totalFunds}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <p className="text-left text-xs w-full text-secondary">
              Your funds
            </p>
          </div>
        </div>
        <div className="flex w-44 justify-between ">
          <div className="circle rounded-full w-14 h-14 bg-cardBg flex items-center justify-center">
            <Expencessvg />
          </div>
          <div className="amount flex flex-col justify-center items-center">
            <CurrencyFormat
              className="text-xl font-bold font-robotoSemiBold text-gray-700"
              value={totalExpence}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <p className="text-left text-xs w-full text-secondary">Expences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountinfo;
