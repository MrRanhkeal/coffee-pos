import React from "react";
import { Chart } from "react-google-charts";
//import PropTypes from "prop-types";
export const data = [
  ["Year", "Purchase", "Sale"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Performance",
  curveType: "function",
  legend: { position: "bottom" },
};
const HomePurchaseChart = (data = []) => {
  if (data == null || data.length == 0) return null;
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      // data={data}
      options={options}
    />
  );
};
// HomePurchaseChart.PropTypes = {
//   data: PropTypes.array,
// }
export default HomePurchaseChart;
