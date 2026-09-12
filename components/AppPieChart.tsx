"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  visitors: {
    label: "Sales",
  },
  chrome: {
    label: "T-Shirts",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Shirts",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Denims",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Jackets",
    color: "var(--chart-4)",
  },
  other: {
    label: "Shoes",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const chartData = [
  { product: "T-shirts", sales: 275, fill: "var(--color-chrome)" },
  { product: "Shirts", sales: 200, fill: "var(--color-safari)" },
  { product: "Denims", sales: 287, fill: "var(--color-firefox)" },
  { product: "Jackets", sales: 173, fill: "var(--color-edge)" },
  { product: "Shoes", sales: 190, fill: "var(--color-other)" },
];

const AppPieChart = () => {

  // If you don't use React compiler use useMemo hook to improve performance
  const totalSales = chartData.reduce((acc, curr) => acc + curr.sales, 0);
  
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Main Products Sales</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-62.5"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="sales"
            nameKey="product"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalSales.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Sales
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none text-sm md:text-base">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-xs md:text-sm leading-none text-muted-foreground">
          Showing the top 5 products sold in the last month
        </div>
      </div>
    </div>
  );
};

export default AppPieChart;