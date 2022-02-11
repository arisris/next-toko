import Inlined from "@/components/Utils/Inlined";
import { fakeArray } from "@/lib/utils";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartDataset,
  LinearScale
} from "chart.js";
import { Card, Link } from "konsta/react";
import { useEffect, useRef, useState } from "react";
import { MdMap } from "react-icons/md";
import colors from "@/lib/colors";

// Todo Chart.js
Chart.register([LinearScale, BarController, CategoryScale, BarElement]);
const BarChart = () => {
  const [up, setUp] = useState(true);
  const canvas = useRef();
  const chart = useRef<Chart>();
  const [datasets, setDatasets] = useState<ChartDataset<"bar", number[]>[]>([
    {
      label: "Data",
      data: [65, 59, 80, 81, 56, 55, 12, 78, 56, 98, 77, 10],
      backgroundColor: [
        colors["blue-500"],
        colors["red-500"],
        colors["green-500"],
        colors["purple-500"],
        colors["yellow-500"],
        colors["teal-500"]
      ]
    }
  ]);

  const createChart = () => {
    chart.current = new Chart(canvas.current, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mai",
          "jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  useEffect(() => {
    if (!chart.current) {
      createChart();
    } else {
      // let t = setInterval(() => {
      //   setUp(!up);
      //   chart.current.destroy();
      //   chart.current = null;
      // }, 5000);
      // return () => clearInterval(t);
    }
  }, [datasets]);

  return <canvas ref={canvas} />;
};

export function AdminPageDashboardIndex() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {fakeArray(4).map((i) => (
          <Card key={i} outline footer={<Link>Read More &raquo;</Link>}>
            <Inlined className="justify-between w-full">
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-4xl font-bold">150%</h4>
                <span>New Order</span>
              </div>
              <div className="text-gray-400 dark:text-gray-800">
                <MdMap className="w-14 h-14" />
              </div>
            </Inlined>
          </Card>
        ))}
      </div>
      <Card className="col-span-12 md:col-span-6" outline>
        <BarChart />
      </Card>
      <Card className="col-span-12 md:col-span-6" outline />
      <Card className="col-span-12 h-48" outline />
    </div>
  );
}
