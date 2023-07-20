import React from "react";
import AreaChart from "./lineChart";

interface DailyTranscationsProps {
  data: any[];
}

const DailyTranscations = ({ data }: DailyTranscationsProps) => {
  return <AreaChart data={data} colorStop={"#7140E4"} unit=" Invoices" />;
};

export default DailyTranscations;
