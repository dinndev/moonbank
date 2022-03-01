import React, { useState, useEffect } from "react";
import { useTransactionContext } from "../../States/TransactionContext";
import { useAlert } from "react-alert";
import EmptyListMessage from "../EmptyListMessage";
import Trashsvg from "../Svg/TrashSvg";
import Editsvg from "../Svg/EditSvg";
function ExpenceList() {
  const [{ expenceList, totalFunds, user }, dispatch] = useTransactionContext();
  const alert = useAlert();
  useEffect(() => {
    // fetch new expence to reflect on expence list
    dispatch({
      type: "SET_EXPENCE_LIST",
      expenceList: user.expenceList,
    });
  }, [user]);
  const deleteExpence = (id, cost, item, idx) => {
    const toDisplayCost =
      typeof cost === "number" ? cost : parseFloat(cost.replace(/\$|,/g, ""));
    dispatch({
      type: "DELETE_EXPENCE",
      toDeleteExpenceID: id,
    });
    dispatch({
      type: "SET_USER",
      user: {
        ...user,
        expenceList: expenceList.filter((_, prevIdx) => prevIdx !== idx),
      },
    });
    dispatch({
      type: "ADD_DELETED_COST_TO_FUNDS",
      cost: toDisplayCost,
    });
    dispatch({
      type: "SUBTRACT_DELETED_COST_TO_EXPENCE",
      cost: toDisplayCost,
    });

    alert.show(`${item} expence deleted`, {
      // custom timeout just for this one alert
      type: "error",
    });
  };
  const getToEditExpence = (item, cost, id) => {
    const toEditExpence = {
      item,
      cost,
      id,
    };
    dispatch({
      type: "GET_TO_EDIT_EXPENCE",
      toEditExpence: toEditExpence,
    });
  };

  return (
    <div className="w-full h-full">
      <h1 className="w-full h-1/5 flex justify-start items-center font-montserratBold text-lg text-primary">
        Expences
      </h1>
      {expenceList.length > 0 ? (
        <table className="w-full h-4/5  ">
          <thead>
            <tr className=" text-left font-montserratBold text-primary h-12 rounded-lg">
              <th>Item</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="  w-full">
            {expenceList.map(({ item, cost, id }, idx) => (
              <tr key={id} className="border-b-2 ">
                <td className="text-xs text-secondary">{item}</td>
                <td className="text-xs text-secondary">{cost}</td>
                <td>
                  <button
                    onClick={() => getToEditExpence(item, cost, id)}
                    className="mr-5"
                  >
                    <Editsvg />
                  </button>
                  <button onClick={() => deleteExpence(id, cost, item, idx)}>
                    <Trashsvg />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyListMessage />
      )}
    </div>
  );
}

export default ExpenceList;
