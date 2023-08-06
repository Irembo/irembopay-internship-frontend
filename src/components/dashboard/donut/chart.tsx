// @ts-nocheck

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import RadianTooltip from "./radianTooltip";

const DonutChart = ({ data, colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, [isMobile]);

  if (isMobile === null) return null;

  return (
    <ResponsiveContainer
      height="85%"
      className="bg-white w-full mt-4 h-full flex justify-center items-center"
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          labelLine={false}
          label={RadianTooltip}
          data={data}
          innerRadius={isMobile ? 30 : 80}
          outerRadius={isMobile ? 50 : 110}
          fill="#8884d8"
          paddingAngle={3}
          isAnimationActive
          animationBegin={0}
          animationDuration={3000}
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
