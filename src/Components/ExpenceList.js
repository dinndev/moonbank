import React, { useState } from "react";
import { useTransactionContext } from "../States/TransactionContext";
import EditInputForm from "./EditInputForm";
import EmptyListMessage from "./EmptyListMessage";
function ExpenceList() {
  const [{ expenceList }, dispatch] = useTransactionContext();
  const [toEditExpence, setToEditExpence] = useState({});

  const deleteExpence = (id) => {
    dispatch({
      type: "DELETE_EXPENCE",
      toDeleteExpenceID: id,
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
            <tr className=" text-left bg-cardBg font-montserratBold text-primary h-12 rounded-lg">
              <th>Item</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="  w-full">
            {expenceList.map(({ item, cost, id }) => (
              <tr key={id} className="border-b-2 ">
                <td className="text-xs text-secondary">{item}</td>
                <td className="text-xs text-secondary">{cost}</td>
                <td>
                  <button
                    onClick={() => getToEditExpence(item, cost, id)}
                    className="mr-5"
                  >
                    {/* Edit svg */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M9.35894 14.842H15"
                        stroke="#466288"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.61172 1.62418C9.26366 0.793541 10.3172 0.836886 11.1487 1.48883L12.3783 2.45304C13.2098 3.10499 13.5044 4.11608 12.8525 4.94848L5.52003 14.3031C5.27499 14.6162 4.90081 14.8011 4.50274 14.8055L1.67469 14.8418L1.03425 12.0863C0.944019 11.6997 1.03425 11.2928 1.27928 10.9788L8.61172 1.62418Z"
                        stroke="#466288"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        opacity="0.4"
                        d="M7.23854 3.37604L11.4793 6.70031"
                        stroke="#466288"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Edit svg */}
                  </button>
                  <button onClick={() => deleteExpence(id)}>
                    {/* Trash svg */}
                    <svg
                      width="13"
                      height="16"
                      viewBox="0 0 13 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 5H5V13H4V5Z" fill="#C85050" />
                      <path d="M6 5H7V13H6V5Z" fill="#C85050" />
                      <path d="M8 5H9V13H8V5Z" fill="#C85050" />
                      <path d="M0 2H13V3H0V2Z" fill="#C85050" />
                      <path
                        d="M9 2H8V1.5C8 1.2 7.8 1 7.5 1H5.5C5.2 1 5 1.2 5 1.5V2H4V1.5C4 0.65 4.65 0 5.5 0H7.5C8.35 0 9 0.65 9 1.5V2Z"
                        fill="#C85050"
                      />
                      <path
                        d="M9.5 16H3.5C2.7 16 2 15.35 1.9 14.55L1 2.54998L2 2.44998L2.9 14.45C2.9 14.75 3.2 15 3.5 15H9.5C9.8 15 10.05 14.75 10.1 14.45L11 2.44998L12 2.54998L11.1 14.55C11 15.35 10.3 16 9.5 16Z"
                        fill="#C85050"
                      />
                    </svg>

                    {/* Thrash Svg */}
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
