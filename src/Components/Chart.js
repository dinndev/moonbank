import { Doughnut } from "react-chartjs-2";
import { useTransactionContext } from "../States/TransactionContext";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = () => {
  const [{ expenceList, totalFunds }] = useTransactionContext();
  const pieData = [...expenceList.map(({ cost }) => cost), totalFunds];
  const pielabel = [...expenceList.map(({ item }) => item), "Funds"];

  const data = {
    labels: pielabel,
    datasets: [
      {
        label: "Expences",
        data: pieData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default Chart;
