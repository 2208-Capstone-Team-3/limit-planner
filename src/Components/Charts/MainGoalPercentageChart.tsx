import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { RootState } from "../../store";

const MainGoalPercentageChart = () => {
  const entries = useSelector((state: RootState) => state.entries.entries);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${Math.round(datum.y)}`}
        />
      }
    >
      <VictoryBar
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
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
