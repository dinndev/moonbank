import React from "react";
import Deposit from "../Account/Deposit";
import Send from "../Account/Send";
import ExpenceGraph from "../Expences/ExpenceGraph";
import Withdraw from "../Account/Withdraw";
const Usercontrol = () => {
  return (
    <div className="flex flex-col  h-full items-center m-5 w-2/5">
      <section className="flex h-1/6 w-3/4 justify-start items-center">
        <div className="w-full h-11 flex p-10 rounded-lg bg-cardBg justify-center items-center">
          <Deposit />
          <Withdraw />
          <Send />
        </div>
      </section>
      <section className="h-4/5  w-full flex justify-center items-center">
        <ExpenceGraph />
      </section>
    </div>
  );
};

export default Usercontrol;
