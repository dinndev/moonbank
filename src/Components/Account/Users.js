import React from "react";
import { useTransactionContext } from "../../States/TransactionContext";
import { useAlert } from "react-alert";
import Trashsvg from "../Svg/TrashSvg";
import CurrencyFormat from "react-currency-format";

const Users = () => {
  const [{ accounts, user }, dispatch] = useTransactionContext();

  const alert = useAlert();

  const deleteAccount = (id) => {
    // check if the id is === current user id if so, return
    if (user.id !== id) {
      dispatch({
        type: "DELETE_ACCOUNT",
        id,
      });
    } else {
      alert.show("Bonk! you can't delete your own account", {
        type: "error",
      });
      return;
    }
  };
  return (
    <div className="w-4/5  flex justify-between items-center flex-col h-full">
      <h1 className="h-1/5 flex items-center justify-center font-montserratBold text-primary text-3xl">
        Accounts
      </h1>
      <ul className="w-3/5 flex flex-col h-4/5">
        {accounts &&
          accounts.map(({ userName, id, totalFunds }) => (
            <div key={id} className="flex w-full justify-between ">
              <li
                className={`flex w-11/12 relative text-xs bg-cardBg rounded-lg p-7 my-2 items-center justify-between ${
                  id === user.id
                    ? "bg-primary text-white"
                    : "bg-cardBg text-black"
                }`}
              >
                <p>
                  <span className="font-bold font-montserratBold mr-2">
                    Name:
                  </span>
                  {`${userName}`}
                </p>
                <p>
                  <span className="font-bold font-montserratBold mr-2">
                    Card:{" "}
                  </span>
                  <CurrencyFormat
                    value={id}
                    displayType={"text"}
                    format="#### #### #### ####"
                  />
                </p>
                <p>
                  <span className="font-bold font-montserratBold mr-2">
                    Funds:{" "}
                  </span>
                  <CurrencyFormat
                    className="text-xs"
                    value={totalFunds}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </p>
              </li>
              {id !== user.id && (
                <button key={id} onClick={() => deleteAccount(id)}>
                  <Trashsvg />
                </button>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Users;
