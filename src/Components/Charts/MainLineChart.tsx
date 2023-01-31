import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { RootState } from "../../store";

const MainLineChart = () => {
  const entries = useSelector((state: RootState) => state.entries.entries);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${Math.round(datum.x)}, ${Math.round(datum.y)}`
          }
        />
      }
    >
      <VictoryLine
        interpolation="natural"
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
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

export default MainLineChart;
