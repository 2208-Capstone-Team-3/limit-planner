import { useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryHistogram,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { RootState } from "../../store";

const MainHistogram = () => {
  const theme = useTheme();
  const entries = useSelector((state: RootState) => state.theme.theme.filteredEntries);
  const data: { x: Date; y: number }[] = [];
  let total = 0;

  entries
    .flat(Infinity)
    .forEach(
      (ele: { start: Date; amount: number; creditDebit: string }, id, arr) => {
        data.push({
          x: new Date(ele.start),
          y:
            ele.creditDebit === "Credit"
              ? (total += ele.amount)
              : (total -= ele.amount),
        });
      }
    );

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      padding={{top: 10, bottom: 30, left: 30, right : 0}}
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 },
      }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${new Date(datum.x).toLocaleDateString(undefined, {
              month: "long",
            })}, ${datum.y}`
          }
          theme={VictoryTheme.material}
          voronoiPadding={{top: 10, bottom: 30, left: 30, right : 0}}
        />
      }
    >
      <VictoryHistogram
        style={{
          data: {
            fill: () =>
              theme.palette.mode === "light" ? blueGrey[500] : deepOrange[900],
          },
        }}
        data={data.sort().map((ele) => {
          return { x: ele.x, y: ele.y };
        })}
      ></VictoryHistogram>
    </VictoryChart>
  );
};

export default MainHistogram;
