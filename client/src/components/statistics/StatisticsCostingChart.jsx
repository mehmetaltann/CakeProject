import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  is3D: true,
  sliceVisibilityThreshold: 0.03, // 20%
  title: "Malzeme Maliyet Ağırlıkları",
};

const StatisticsCostingChart = ({ data }) => {
  const convertedData = data.map((item) => {
    return [item.name, item.cost];
  });
  const newConvertedData = [["Malzemeler", "Maliyet"]].concat(convertedData);

  return (
    <Chart
      chartType="PieChart"
      data={newConvertedData}
      options={options}
      width={"60vh"}
      height={"60vh"}
    />
  );
};

export default StatisticsCostingChart;
