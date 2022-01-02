import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import randomColorRGB from "random-color-rgb";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "",
      color: "#cf9fff",
    },
  },
  scales: {
    r: {
      angleLines: {
        color: "#e6ccff",
      },
      grid: { color: "#e6ccff" },
      pointLabels: {
        color: "white",
      },
    },
  },
};
const RadarChart = (props) => {
  options.plugins.title.text = props.titleText;
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

  return <Radar options={options} data={chartData} />;
};

export default RadarChart;
