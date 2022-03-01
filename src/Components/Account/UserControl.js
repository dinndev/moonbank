import React from "react";
import Deposit from "../Account/Deposit";
import Send from "../Account/Send";
import ExpenceGraph from "../Expences/ExpenceGraph";
import Withdraw from "../Account/Withdraw";
const Usercontrol = () => {
  return (
    <div className="h-full w-6/12">
      <section className="flex h-1/2">
        <div className="w-6/12">
          <Deposit />
          <Withdraw />
        </div>
        <Send />
      </section>
      <section className="h-1/2 w-full flex justify-center items-center">
        <ExpenceGraph />
      </section>
    </div>
  );
};

export default Usercontrol;
