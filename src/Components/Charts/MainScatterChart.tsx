import { useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";
import { RootState } from "../../store";

const MainScatterChart = () => {
  const theme = useTheme();
  const entries = useSelector((state: RootState) => state.entries.entries);
  const data: { x: Date; y: number; amount: number }[] = [];
  let total = 0;
  entries
    .flat(Infinity)
    .forEach((ele: { start: Date; amount: number; creditDebit: string }) => {
      data.push({
        x: new Date(ele.start),
        y:
          ele.creditDebit === "Credit"
            ? (total += ele.amount)
            : (total -= ele.amount),
        amount: ele.creditDebit === "Credit" ? ele.amount : -ele.amount,
      });
    });

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      key={"ScatterChartContainer"}
      containerComponent={
        <VictoryZoomContainer
          key={"ScatterZoomContainer"}
          theme={VictoryTheme.material}
        />
      }
    >
      <VictoryScatter
        name="ScatterChart"
        key={"MainScatterChart"}
        size={({ datum }) =>
          Math.pow(datum.amount, 0.2) ? Math.pow(datum.amount, 0.2) : 0
        }
        style={{
          data: {
            fill: () =>
              theme.palette.mode === "light" ? blueGrey[500] : deepOrange[900],
          },
        }}
        data={data.sort().map((ele) => {
          return { x: ele.x, y: ele.y, amount: ele.amount };
        })}
      ></VictoryScatter>
    </VictoryChart>
  );
};

export default MainScatterChart;
