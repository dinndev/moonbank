import React, { useEffect } from "react";
import { useTransactionContext } from "../States/TransactionContext";
import Accountinfo from "./AccountInfo";
import Expenceinput from "./ExpenceInput";
import ExpenceList from "./ExpenceList.js";

const ManageExpences = () => {
  const [{ expenceList, totalFunds, totalExpence, user, accounts }, dispatch] =
    useTransactionContext();
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  return (
    <div className="w-3/6 h-full mr-8 ">
      <div className="w-full h-2/4 ">
        <Accountinfo />
        <Expenceinput />
      </div>
      <div className="h-2/4 w-full">
        <ExpenceList />
      </div>
    </div>
  );
};

export default ManageExpences;
