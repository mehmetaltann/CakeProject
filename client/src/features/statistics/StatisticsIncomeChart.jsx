import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  is3D: true,
  sliceVisibilityThreshold: 0.02, // 20%
  title: "Pasta Türü Ağırlıkları",
};

const StatisticsCostingChart = ({ data }) => {
  const convertedData = data.map((item) => {
    return [`${item.name}-${item.size}`, item.count];
  });
  const newConvertedData = [["Pasta Türü", "Yapılma Sayısı"]].concat(
    convertedData
  );

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
