import React from "react";
import { useTransactionContext } from "../../States/TransactionContext";
import { useAlert } from "react-alert";
import Trashsvg from "../Svg/TrashSvg";

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
            <div className="flex w-full justify-between ">
              <li
                key={id}
                className={`flex w-11/12 relative text-xs bg-cardBg rounded-lg p-7 my-2 items-center justify-between ${
                  id === user.id
                    ? "bg-primary text-white"
                    : "bg-cardBg text-black"
                }`}
              >
                <p>
                  <span className="font-bold font-montserratBold mr-2">
                    name:
                  </span>
                  {`${userName}`}
                </p>
                <p>
                  <span className="font-bold font-montserratBold mr-2">
                    card:{" "}
                  </span>
                  {` ${id}`}
                </p>
                <p>
                  <span className="font-bold font-montserratBold mr-2">
                    funds:{" "}
                  </span>
                  {` ${totalFunds}`}
                </p>
              </li>
              {id !== user.id && (
                <button onClick={() => deleteAccount(id)}>
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
