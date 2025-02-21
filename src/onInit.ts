import { Chart, type ChartDataset, type Point } from "chart.js/auto";
import "chartjs-adapter-date-fns";

import "./style.css";

const chartElt = htmlNode.querySelector<HTMLCanvasElement>("#chart-canvas");

if (!chartElt) {
  throw new Error("No chart element found");
}

const chart = new Chart(chartElt, {
  type: "line",
  data: {
    datasets: [],
  },
  options: {
    scales: {
      x: {
        type: "time",
      },
    },
  },
});

function onPanelUpdate() {
  const datasets: ChartDataset<"line", (number | Point | null)[]>[] =
    data.series.map((series) => {
      const timeField = series.fields.at(0);
      const valueField = series.fields.at(1);
      if (!valueField || !timeField) {
        return { label: "Unknown", data: [] };
      }
      const seriesName = series.name ?? series.refId ?? "Unknown";
      const fieldValues = valueField.values;
      const timeValues = timeField.values;

      const data = fieldValues
        .map((y, i) => ({ y, x: timeValues[i] }))
        .filter(
          (d): d is { x: number; y: number } =>
            typeof d.x === "number" && typeof d.y === "number",
        );
      return { label: seriesName, data };
    });

  chart.data.datasets = datasets;
  chart.update();
}

htmlNode.addEventListener("panelupdate", onPanelUpdate);
