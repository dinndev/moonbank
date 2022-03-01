import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "/Users/aladinpenagunda/Desktop/Activities/moonbank/src/States/TransactionContext.js";
import { useAlert } from "react-alert";
import MoneySvg from "../Svg/MoneySvg";
const Withdraw = () => {
  const [onChangeWithdrawValue, setOnChangeWithdrawValue] = useState("");
  const [{ totalFunds, user }, dispatch] = useTransactionContext();
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChangeWithdrawValue !== "") {
      const withdraw = parseFloat(onChangeWithdrawValue.replace(/\$|,/g, ""));
      if (withdraw > totalFunds) {
        alert.show(
          `can't withdraw ${onChangeWithdrawValue} unsufficient funds`,
          {
            type: "info",
          }
        );
        return;
      } else {
        dispatch({
          type: "WITHDRAW",
          withdraw,
        });
      }
      setOnChangeWithdrawValue("");
      // Set alert for withdraw
      alert.show(
        `succesfully withdraw ${onChangeWithdrawValue} from your account`,
        {
          // custom timeout just for this one alert
          type: "success",
        }
      );
    } else {
      return;
    }
  };
  return (
    <div className="mb-4 mr-4  bg-cardBg h-1/2 rounded-3xl p-5 w-72">
      <h1 className="text-primary font-montserratBold text-lg">
        Withdraw Funds
      </h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <label
          htmlFor="withdraw"
          className="text-secondary text-xs font-robotoSemiBold "
        >
          Amount
        </label>
        <div className="flex mt-3 h-24">
          <CurrencyFormat
            required
            className={`bg-navBg w-3/4 outline-none p-2 mr-2 rounded-lg text-3xl ${
              totalFunds < 0 || totalFunds === 0
                ? " text-red-500"
                : "text-primary"
            }`}
            value={onChangeWithdrawValue}
            thousandSeparator={true}
            prefix={"$"}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setOnChangeWithdrawValue(formattedValue);
            }}
          />
          <button
            className="bg-white rounded-lg  w-3/12 text-center"
            type="submit"
          >
            <span className="text-primary font-bold">-</span>
            <MoneySvg />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
