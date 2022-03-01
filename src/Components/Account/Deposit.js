import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "/Users/aladinpenagunda/Desktop/Activities/moonbank/src/States/TransactionContext.js";
import { useAlert } from "react-alert";
import MoneySvg from "../Svg/MoneySvg";
const Deposit = () => {
  const alert = useAlert();
  const [onChangeDepositValue, setOnChangeDepositValue] = useState("");
  const [{}, dispatch] = useTransactionContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChangeDepositValue !== "") {
      const deposit = parseFloat(onChangeDepositValue.replace(/\$|,/g, ""));
      dispatch({
        type: "DEPOSIT",
        deposit,
      });
      setOnChangeDepositValue("");
      alert.show(`${onChangeDepositValue} deposit to your account`, {
        // custom timeout just for this one alert
        type: "success",
      });
    } else {
      return;
    }
  };

  return (
    <div className="mb-4  bg-cardBg h-1/2 rounded-3xl p-5 w-72">
      <h1 className="text-primary font-montserratBold text-lg">
        Deposit Funds
      </h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <label
          htmlFor="deposit"
          className="text-secondary text-xs font-robotoSemiBold "
        >
          Amount
        </label>
        <div className="flex mt-3 h-24">
          <CurrencyFormat
            required
            className="bg-navBg w-3/4 outline-none p-2 mr-2 rounded-lg text-3xl"
            value={onChangeDepositValue}
            thousandSeparator={true}
            prefix={"$"}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setOnChangeDepositValue(formattedValue);
            }}
          />
          <button
            className="bg-white rounded-lg  w-3/12 text-center"
            type="submit"
          >
            <span className="text-primary font-bold">+</span>
            <MoneySvg />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
