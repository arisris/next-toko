import Inlined from "@/components/Utils/Inlined";
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
import { MdGroup, MdHome, MdShoppingCart } from "react-icons/md";
import colors from "@/lib/colors";
import { trpc } from "@/lib/trpc";

Chart.register([LinearScale, BarController, CategoryScale, BarElement]);

const BarChart = ({ data }) => {
  const canvas = useRef();
  const chart = useRef<Chart>();

  useEffect(() => {
    if (chart.current) {
      chart.current.destroy();
    }
    chart.current = new Chart(canvas.current, {
      type: "bar",
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          label: "User Signups",
          data: data.map(d => d.count),
          backgroundColor: [
            colors["blue-500"],
            colors["red-500"],
            colors["green-500"],
            colors["purple-500"],
            colors["yellow-500"],
            colors["teal-500"]
          ]
        }]
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
  }, [data]);

  return <canvas ref={canvas} />;
};

export function AdminPageDashboardIndex() {
  const { data: stats } = trpc.admin.stats.useQuery();
  const { data: userSignups } = trpc.admin.userSignups.useQuery();

  const statCards = [
    { name: "Users", value: stats?.userCount, icon: <MdGroup className="w-14 h-14" /> },
    { name: "Products", value: stats?.productCount, icon: <MdShoppingCart className="w-14 h-14" /> },
    { name: "Stores", value: stats?.storeCount, icon: <MdHome className="w-14 h-14" /> },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat, i) => (
          <Card key={i} outline footer={<Link>Read More &raquo;</Link>}>
            <Inlined className="justify-between w-full">
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-4xl font-bold">{stat.value ?? "..."}</h4>
                <span>{stat.name}</span>
              </div>
              <div className="text-gray-400 dark:text-gray-800">
                {stat.icon}
              </div>
            </Inlined>
          </Card>
        ))}
      </div>
      <Card className="col-span-12 md:col-span-6" outline>
        {userSignups && <BarChart data={userSignups} />}
      </Card>
      <Card className="col-span-12 md:col-span-6" outline />
      <Card className="col-span-12 h-48" outline />
    </div>
  );
}
