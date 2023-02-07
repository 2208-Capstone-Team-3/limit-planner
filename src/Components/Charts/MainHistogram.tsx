import { utcMonth, utcMonths } from "d3";
import { getMonth } from "date-fns";
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
  const entries = useSelector((state: RootState) => state.entries.entries);
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
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${new Date(datum.x).toLocaleDateString(undefined, {
              month: "long",
            })}, ${datum.y}`
          }
          theme={VictoryTheme.material}
        />
      }
    >
      <VictoryHistogram
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        style={{
          data: { fill: "#c43a31" },
        }}
        data={data.sort().map((ele) => {
          return { x: ele.x, y: ele.y };
        })}
      ></VictoryHistogram>
    </VictoryChart>
  );
};

export default MainHistogram;
