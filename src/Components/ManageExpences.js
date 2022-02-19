import React from "react";
import { useTransactionContext } from "../States/TransactionContext";
import Accountinfo from "./AccountInfo";
import Expenceinput from "./ExpenceInput";
import ExpenceList from "./ExpenceList.js";

const ManageExpences = () => {
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
