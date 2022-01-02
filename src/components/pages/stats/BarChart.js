import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import randomColorRGB from "random-color-rgb";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
const BarChart = (props) => {
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
    <Bar
      options={{
        responsive: true,

        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: props.titleText,
            color: "#cf9fff",
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255,255,255,0.5)",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255,255,255,0.5)",
            },
          },
        },
      }}
      data={chartData}
    />
  );
};

export default BarChart;
