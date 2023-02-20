import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const ExampleLineChart = (isActive: {isActive:boolean}) => {
  return (
    <VictoryChart animate={isActive.isActive}  theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "white" },
          parent: { border: "1px solid #ccc" },
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
      />
    </VictoryChart>
  );
};

export default ExampleLineChart;
