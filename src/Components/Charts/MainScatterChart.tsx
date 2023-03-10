import React from "react";
import { useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
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
  const entries = useSelector((state: RootState) => state.theme.theme.filteredEntries);
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
    standalone
      theme={VictoryTheme.material}
      key={"ScatterChartContainer"}
      padding={{top: 10, bottom: 30, left: 30, right : 0}}
      containerComponent={
        <VictoryZoomContainer
          key={"ScatterZoomContainer"}
          theme={VictoryTheme.material}
        />
      }
    >
      <VictoryScatter
      standalone
        name="ScatterChart"
        key={"MainScatterChart"}
        size={({ datum }) =>
          Math.floor(Math.pow(datum.amount, 0.2)) ? Math.pow(datum.amount, 0.2) : 2
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
