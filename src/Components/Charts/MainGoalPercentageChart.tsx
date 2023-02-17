import { useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

const MainGoalPercentageChart = () => {
  const theme = useTheme();
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      padding={{top: 0, bottom: 60, left: 60, right : 0}}
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
          data: {
            fill: () =>
              theme.palette.mode === "light" ? blueGrey[500] : deepOrange[900],
          },
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
