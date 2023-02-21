import { useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const MainGoalPercentageChart = () => {
  const theme = useTheme();
  let goalSelector = useSelector(
    (state: RootState) => state.theme.theme.goalSelector
  );
  let projection = useSelector(
    (state: RootState) => state.theme.theme.projection
  );

  return (
    <VictoryChart
    standalone
      theme={VictoryTheme.material}
      padding={{ top: 10, bottom: 30, left: 30, right: 0 }}
      name={"GoalChart"}
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 },
      }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${Math.round(datum.y)}`}
          voronoiPadding={{ top: 10, bottom: 30, left: 30, right: 0 }}
        />
      }
    >
      <VictoryBar
      standalone
        style={{
          data: {
            fill: () =>
              theme.palette.mode === "light" ? blueGrey[500] : deepOrange[900],
          },
        }}
        barRatio={10}
        domain={{ y: [0, goalSelector ? goalSelector?.goalAmount : 100] }}
        data={[{ x: "Progress To Primary Goal", y: projection ? projection : 0 }]}
        labelComponent={<VictoryLabel />}
      />
    </VictoryChart>
  );
};

export default MainGoalPercentageChart;
