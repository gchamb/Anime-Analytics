import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import randomColorRGB from "random-color-rgb";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = (props) => {
  const chartData = {
    labels: props.dataLabels,
    datasets: [
      {
        data: props.data,
        backgroundColor: props.data.map(() =>
          randomColorRGB({ opacity: 0.75 })
        ),
      },
    ],
  };
  return (
    <Pie
      options={{
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white", // not 'fontColor:' anymore
            },
          },
          title: {
            display: true,
            text: props.titleText,
            color: "#cf9fff",
          },
        },
      }}
      data={chartData}
    />
  );
};

export default PieChart;
