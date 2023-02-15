import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

const MainGoalPercentageChart = () => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      name={"GoalChart"}
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 },
      }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${Math.round(datum.y)}`}
        />
      }
    >
      <VictoryBar

        style={{
          data: { fill: "#c43a31" },
        }}
        barRatio={10}
        domain={{ y: [0, 100] }}
        data={[{ x: "Progress To Primary Goal", y: 90 }]}
        labelComponent={<VictoryLabel />}
      />
    </VictoryChart>
  );
};

export default MainGoalPercentageChart;
