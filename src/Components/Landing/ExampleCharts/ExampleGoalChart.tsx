import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

const ExampleGoalChart = (isActive: { isActive: boolean }) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      name={"GoalChart"}
      animate={isActive.isActive}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${Math.round(datum.y)}`}
        />
      }
    >
      <VictoryBar
        style={{
          data: { fill: "lightgrey" },
          parent: { border: "1px solid #ccc" , color: "white" },
        }}
        barRatio={10}
        domain={{ y: [0, 100] }}
        data={[{ x: "Progress To Primary Goal", y: 90 }]}
        
      />
    </VictoryChart>
  );
};

export default ExampleGoalChart;
