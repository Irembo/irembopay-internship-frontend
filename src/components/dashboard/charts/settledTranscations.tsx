import React from "react";
import AreaChart from "./lineChart";


interface DailyTranscationsProps {
  data: any[];
}

const SettledTranscations = ({ data }: DailyTranscationsProps) => {
  return <AreaChart data={data} colorStop={"#0063CF"} unit="Transactions" />;
};

export default SettledTranscations;
