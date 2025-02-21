import { Chart } from "chart.js/auto";
import "./style.css";

const chartElt = htmlNode.querySelector<HTMLCanvasElement>("#chart-canvas");

if (!chartElt) {
  throw new Error("No chart element found");
}

new Chart(chartElt, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
