import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";

import "./style.css";

const chartElt = htmlNode.querySelector<HTMLCanvasElement>("#chart-canvas");

if (!chartElt) {
  throw new Error("No chart element found");
}

const chart = new Chart(chartElt, {
  type: "bar",
  data: {
    datasets: [],
  },
});

function onPanelUpdate() {
  const thing = data.series.map((series) => {
    const seriesName = series.name ?? series.refId ?? "Unknown";
    const valueField = series.fields.at(1);
    const fieldValue = valueField?.state?.calcs?.last;

    if (typeof fieldValue !== "number") {
      // eslint-disable-next-line unicorn/no-null
      return { label: seriesName, value: null };
    }

    return { label: seriesName, value: fieldValue };
  });

  const labels = thing.map((t) => t.label);
  const values = thing.map((t) => t.value);

  chart.data = {
    labels,
    datasets: [
      {
        label: "Series",
        data: values,
      },
    ],
  };
  chart.update();
}

htmlNode.addEventListener("panelupdate", onPanelUpdate);
