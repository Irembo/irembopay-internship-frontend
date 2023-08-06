// @ts-nocheck

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import RadianTooltip from "./radianTooltip";

const DonutChart = ({ data, colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer height={300} width="100%" className="bg-white my-4 w-full h-full flex justify-center items-center">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          labelLine={false}
          label={RadianTooltip}
          data={data}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={3}
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
