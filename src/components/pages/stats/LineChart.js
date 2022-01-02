import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import randomColorRGB from "random-color-rgb";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
    title: {
      display: true,
      text: "",
      color: "#cf9fff",
    },
  },

  scales: {
    y: {
      grid: {
        color: "rgb(255,255,255,0.5)",
      },
      ticks: {
        color: "white",
      },
    },
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "rgb(255,255,255,0.5)",
      },
    },
  },
};

const LineChart = (props) => {
  options.plugins.title.text = props.titleText;
  const colorOne = randomColorRGB({ opacity: 0.75 });
  const colorTwo = randomColorRGB({ opacity: 0.75 });
  const dataOne = {
    data: props.dataOne,
    label: props.dataOneLabel,

    backgroundColor: colorOne,
    borderColor: colorOne,
  };
  const dataTwo = {
    data: props.dataTwo,
    label: props.dataTwoLabel,
    backgroundColor: colorTwo,
    borderColor: colorTwo,
  };
  const chartData = {
    labels: props.dataLabels,
    datasets: [dataOne, dataTwo],
  };
  return <Line options={options} data={chartData} />;
};

export default LineChart;
