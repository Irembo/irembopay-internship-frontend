import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import RadianTooltip from "./radianTooltip";

const DonutChart = ({ data, colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={800} height={400}>
      <Pie
        activeIndex={activeIndex}
        labelLine={false}
        label={RadianTooltip}
        data={data}
        cx={300}
        cy={200}
        innerRadius={40}
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
  );
};

export default DonutChart;
