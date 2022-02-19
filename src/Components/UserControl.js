import React from "react";
import Deposit from "./Deposit";
import Send from "./Send";
import ExpenceGraph from "./ExpenceGraph";
import Withdraw from "./Withdraw";
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
      <section className="h-1/2">
        <ExpenceGraph />
      </section>
    </div>
  );
};

export default Usercontrol;
