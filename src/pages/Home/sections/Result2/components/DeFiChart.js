import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { useMediaQuery } from "src/utils/useMediaQuery";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export function DeFiChart({ data }) {
  const gapSize = data.datasets[0].data.reduce((sum, e) => sum + e) * 0.01;
  const images = data.images.reduce((o, e) => o.concat([e, ""]), []);
  const logoImage = data.logoImage;

  const isMobile = !useMediaQuery("(min-width: 1024px)");

  return (
    <Doughnut
      data={{
        labels: data.labels.reduce((o, e) => o.concat([e, ""]), []),
        datasets: [
          {
            label: data.datasets[0].label,
            data: data.datasets[0].data.reduce(
              (o, e) => o.concat([e, gapSize]),
              []
            ),
            backgroundColor: data.datasets[0].backgroundColor.reduce(
              (o, e) => o.concat([e, "rgba(0,0,0,0)"]),
              []
            ),
            borderColor: data.datasets[0].borderColor.reduce(
              (o, e) => o.concat([e, "rgba(0,0,0,0)"]),
              []
            ),
          },
        ],
      }}
      options={{
        borderWidth: 1,
        borderRadius: 8.24,
        cutout: "55%",
        radius: "90%",
        plugins: {
          datalabels: {
            display: true,
            formatter: (value) => "",
          },
          tooltip: {
            enabled: (...args) => {
              return false;
            },
          },
        },
      }}
      plugins={[
        {
          afterDraw: (chart) => {
            // draw protocol logos
            const ctx = chart.ctx;
            chart["$datalabels"]["_labels"].forEach((item) => {
              const index = item["$context"]["dataIndex"];

              if (index % 2) return;
              const rect = item["$layout"]["_box"]["_rect"];
              const [width, height] = isMobile ? [24, 24] : [36, 36];
              ctx.drawImage(
                images[index],
                rect.x + rect.w / 2 - width / 2,
                rect.y + rect.h / 2 - height / 2,
                width,
                height
              );
            });

            // draw main logo at the center of the chart
            const centerX = chart.width / 2;
            const centerY = chart.height / 2;
            const width = chart.width * 0.302;
            const height = chart.height * 0.302;
            const x = centerX - width / 2;
            const y = centerY - height / 2;
            ctx.drawImage(logoImage, x, y, width, height);
          },
        },
      ]}
    />
  );
}
