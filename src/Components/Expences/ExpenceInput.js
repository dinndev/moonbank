import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrencyFormat from "react-currency-format";
import uniqid from "uniqid";

import { useTransactionContext } from "../../States/TransactionContext";
import { useAlert } from "react-alert";

const Expenceinput = () => {
  const [
    { toEditExpence, expenceList, totalExpence, user, totalFunds },
    dispatch,
  ] = useTransactionContext();

  const alert = useAlert();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [costOnchageValue, setCostOnchageValue] = useState("");
  const [itemOnchageValue, setItemOnchageValue] = useState("");
  // update accounts when user changes
  useEffect(() => {
    dispatch({
      type: "UPDATE_ACCOUNTS",
      updatedUser: user,
    });
  }, [user]);
  // Add the expences to local storage on load and every time expence add

  useEffect(() => {
    if (toEditExpence.cost && toEditExpence.item) {
      setItemOnchageValue(toEditExpence.item);
      setCostOnchageValue(toEditExpence.cost);
    }
  }, [toEditExpence]);

  const saveEditedExpence = () => {
    const editedExpence = {
      item: itemOnchageValue,
      cost: costOnchageValue,
      id: toEditExpence.id,
    };
    //  check if the input is empty
    if (itemOnchageValue && costOnchageValue !== "") {
      dispatch({
        type: "EDIT_EXPENCE",
        editedExpence,
      });
      dispatch({
        type: "SUBTRACT_EXPENCE_TO_FUNDS",
      });
      // dispatch({
      //   type: "UPDATE_STATS",
      // });
      alert.show(`${itemOnchageValue} updated`, {
        // custom timeout just for this one alert
        type: "success",
      });
      setItemOnchageValue("");
      setCostOnchageValue("");
      cancelEditExpence();
    } else {
      alert.show(`Update failed`, {
        // custom timeout just for this one alert
        type: "info",
      });
      return;
    }
  };

  // cancel edit, reset the  input value
  const cancelEditExpence = () => {
    dispatch({
      type: "GET_TO_EDIT_EXPENCE",
      toEditExpence: {},
    });
    setItemOnchageValue("");
    setCostOnchageValue("");
  };
  // Get recent expence
  const getRecentExpence = (recentExpence) => {
    const { item, cost } = recentExpence;
    const toDisplayCost = parseFloat(cost.replace(/\$|,/g, ""));
    //   set the value of input to expences
    const expence = {
      item,
      cost,
      id: uniqid(),
    };
    dispatch({
      type: "SET_USER",
      user: {
        ...user,
        expenceList: [...user.expenceList, expence],
      },
    });
    dispatch({
      type: "ADD_EXPENCE",
      recentExpence: expence,
    });
    dispatch({
      type: "ADD_RECENT_COST_TO_TOTAL_EXPENCE",
      cost: toDisplayCost,
    });
    dispatch({
      type: "SUBTRACT_RECENT_COST_TO_FUNDS",
      cost: toDisplayCost,
    });
    alert.show(`${item} costing: ${cost} added`, {
      // custom timeout just for this one alert
      type: "success",
    });
    //  reset inputs
    resetField("item");
    resetField("cost");
    setCostOnchageValue("");
    setItemOnchageValue("");
  };

  return (
    <div className="h-1/3 flex flex-col justify-between ">
      <h1 className="font-montserratBold text-primary text-lg">Add expences</h1>
      <form
        className=" h-2/3 flex justify-between"
        onSubmit={handleSubmit(getRecentExpence)}
      >
        <div
          className={`flex justify-evenly flex-col  ${
            toEditExpence.cost ? "w-2/4" : " w-5/12"
          }`}
        >
          <input
            value={itemOnchageValue}
            {...register("item", {
              required: "true",
              onChange: (e) => setItemOnchageValue(e.target.value),
            })}
            className="h-1/2 border p-5 outline-none bg-inputColor rounded-lg "
            type="text"
            name="item"
          />
          <label
            className="text-secondary font-robotoSemiBold text-xs"
            htmlFor="item"
          >
            Item
          </label>
        </div>
        <div
          className={`flex justify-evenly flex-col ${
            toEditExpence.cost ? "w-2/4 ml-5" : " w-5/12"
          }`}
        >
          <input
            value={costOnchageValue}
            {...register("cost", {
              required: "true",
              onChange: (e) => setCostOnchageValue(e.target.value),
            })}
            type="number"
            className="rounded-lg border  outline-none p-5 h-1/2 bg-inputColor"
            name="cost"
          />
          <label
            className=" text-secondary font-robotoSemiBold text-xs"
            htmlFor="item"
          >
            Cost
          </label>
        </div>
        <button
          className={`h-1/2 mt-3 font-montserratBold text-sm bg-primary ${
            toEditExpence.cost ? "hidden" : " block"
          } text-white rounded-lg p-3`}
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="flex w-full ">
        <button
          onClick={saveEditedExpence}
          className={`h-3/4 w-4/5 mr-4 mt-3 font-montserratBold text-sm bg-primary ${
            toEditExpence.cost ? "block" : " hidden"
          } text-white rounded-lg p-3`}
          type="submit"
        >
          Save
        </button>
        <button
          onClick={cancelEditExpence}
          className={`h-3/4 w-1/5 mt-3 font-montserratBold text-sm bg-transparent text-red-500 ${
            toEditExpence.cost ? "block" : " hidden"
          } text-red-400 rounded-lg p-3`}
          type="submit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Expenceinput;
