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

const generateDummyData = () => {
  const data = [];
  const oneDayAgo = new Date().getTime() - 24 * 60 * 60 * 1000;

  // Generate a rising pattern
  const risingPattern = Array.from({ length: 70 }, (_, i) => i * 8000);

  // Generate a falling pattern
  const fallingPattern = Array.from({ length: 30 }, (_, i) => (69 - i) * 8000);

  // Combine the rising and falling patterns
  const pattern = [...risingPattern, ...fallingPattern];

  for (let i = 0; i < 100; i++) {
    const createdAt = oneDayAgo + i * 15 * 60 * 1000; // Generate data every 15 minutes
    const variation = pattern[i % 100];
    const randomVariation = Math.floor(Math.random() * 50000) - 2000; // Random variation between -4000 and 4000
    const tvl = 100000 + variation + randomVariation; // Start with a base value of 100k and add the variation and random variation
    data.push({ createdAt, tvl });
  }

  return data;
};

const convertDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return `${hour}:00`;
};

interface ChartProps {
  colorStop: string;
}

export default function AreaChart({ colorStop }: ChartProps) {
  const data = generateDummyData();
  return (
    <ResponsiveContainer className="bg-white my-4">
      <ComposedChart
        width={400}
        height={300}
        data={data}
        margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
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
          dataKey="createdAt"
          tickFormatter={convertDate}
          tick={{
            fontSize: 12,
          }}
        />
        {/* <Tooltip /> */}
        <Tooltip />
        <CartesianGrid vertical={false} stroke="#ffffff" />

        <Line
          type="basis"
          unit=" Invoices"
          isAnimationActive
          strokeLinecap="round"
          strokeWidth={3}
          dataKey="tvl"
          stroke={colorStop}
          dot={false}
          legendType="none"
          strokeLinejoin="miter"
          animationBegin={0}
          animationDuration={1000}
        />
        <Area
          type="basis"
          dataKey="tvl"
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
