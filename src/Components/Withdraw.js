import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "../States/TransactionContext";
import { useAlert } from "react-alert";
const Withdraw = () => {
  const [onChangeWithdrawValue, setOnChangeWithdrawValue] = useState("");
  const [{ totalFunds }, dispatch] = useTransactionContext();
  const alert = useAlert();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChangeWithdrawValue !== "") {
      const withdraw = parseFloat(onChangeWithdrawValue.replace(/\$|,/g, ""));
      if (withdraw > totalFunds) {
        return;
      } else {
        dispatch({
          type: "WITHDRAW",
          withdraw,
        });
      }
      setOnChangeWithdrawValue("");
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
            <svg className="ml-4 h-8 w-8" viewBox="0 0 30 19" fill="none">
              <path
                d="M26.1926 0H6.63965C4.79857 0 3.30111 1.37393 3.30111 3.06289V3.33136C1.47748 3.35041 0 4.71531 0 6.39242V15.9214C0 17.6104 1.49774 18.9843 3.33854 18.9843H22.8915C24.7323 18.9843 26.23 17.6104 26.23 15.9214V15.6529C28.0532 15.6343 29.5311 14.2694 29.5311 12.5919V3.06304C29.5316 1.37407 28.0334 0 26.1926 0ZM24.0892 15.9214C24.0892 16.4175 23.541 16.8363 22.8919 16.8363H3.33896C2.68985 16.8363 2.14164 16.4175 2.14164 15.9214V6.39256C2.14164 5.89671 2.69014 5.47764 3.33896 5.47764H22.8919C23.541 5.47764 24.0892 5.89685 24.0892 6.39256V15.9214ZM26.2304 13.5038V6.39242C26.2304 4.70345 24.7327 3.32952 22.8919 3.32952H5.44233V3.06289C5.44233 2.56704 5.99082 2.14798 6.63965 2.14798H26.1926C26.8417 2.14798 27.3899 2.56719 27.3899 3.06289V12.5919H27.3903C27.3902 13.078 26.8625 13.4877 26.2304 13.5038Z"
                fill="#466288"
              />
              <path
                d="M12.8148 10.0935C11.9017 9.97915 11.4381 9.84234 11.4381 9.41048C11.4381 8.74155 12.3595 8.66933 12.756 8.66933C13.3393 8.66933 13.9844 8.96573 14.1946 9.33016L14.2781 9.47566L15.6108 8.82772L15.5294 8.65329C15.0604 7.64661 14.2289 7.34257 13.587 7.21894V6.32809H12.0282V7.2143C10.6554 7.43892 9.84136 8.2514 9.84136 9.41018C9.84136 11.3169 11.5432 11.5167 12.6683 11.6494C13.6909 11.7763 14.1676 12.0343 14.1676 12.4611C14.1676 13.2866 13.0581 13.3507 12.7177 13.3507C11.9547 13.3507 11.2198 12.9536 11.0086 12.4265L10.938 12.2513L9.49216 12.8951L9.56345 13.0702C9.97027 14.0712 10.8422 14.7025 12.0277 14.8599V15.8202H13.5864V14.8119C14.7242 14.6645 15.8203 13.8998 15.8203 12.4606C15.8207 10.4831 14.0122 10.2489 12.8148 10.0935Z"
                fill="#466288"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
