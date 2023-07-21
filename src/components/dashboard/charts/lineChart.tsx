import React from "react";
import {
  Line,
  ComposedChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const convertDate = (timestamp: string) => {
  // format of date: Jan 15
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};

interface ChartProps {
  colorStop: string;
  data: any[];
  unit: string;
}

export default function AreaChart({ colorStop, data, unit }: ChartProps) {
  // const data = generateDummyData();
  return (
    <ResponsiveContainer className="bg-white my-4">
      <ComposedChart
        width={400}
        height={300}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id={`colorUv` + colorStop}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={colorStop} stopOpacity={0.5} />
            <stop offset="100%" stopColor={colorStop} stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(timestamp) => convertDate(timestamp)}
          tick={{
            fontSize: 10,
          }}
        />
        <Tooltip />
        <CartesianGrid vertical={false} stroke="#ffffff" />

        <Line
          type="linear"
          unit={unit}
          isAnimationActive
          strokeLinecap="round"
          strokeWidth={3}
          dataKey="value"
          stroke={colorStop}
          dot={false}
          legendType="none"
          strokeLinejoin="miter"
          animationBegin={0}
          animationDuration={1000}
        />
        <Area
          type="linear"
          unit={unit}
          dataKey="value"
          isAnimationActive
          stroke={""}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(${`#colorUv` + colorStop})`}
          animationBegin={0}
          animationDuration={1000}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
