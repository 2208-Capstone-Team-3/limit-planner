import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { RootState } from "../../store";
import { addMonths, subMonths } from "date-fns";

const MainLineChart = () => {
  let entries = useSelector((state: RootState) => state.entries.entries);
  let dateSelector = useSelector(
    (state: RootState) => state.theme.theme.dateSelector
  );
  const data: { x: any; y: any }[] = [];
  let accountTotal = 0;
  entries
    .flat(Infinity)
    .forEach((ele: { start: Date; amount: number; creditDebit: string }) => {
      data.push({
        x: new Date(ele.start),
        y:
          ele.creditDebit === "Credit"
            ? (accountTotal += ele.amount)
            : (accountTotal -= ele.amount),
      });
    });
  return (
    <VictoryChart
      domain={{
        x: [
          subMonths(new Date(dateSelector), 1),
          addMonths(new Date(dateSelector), 1),
        ],
      }}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${datum.x?.toDateString()}, $${datum.y}`}
          theme={VictoryTheme.material}
          voronoiDimension={"x"}
        />
      }
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        interpolation="linear"
        name="line"
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        // minDomain={{ x: Number(subMonths(new Date(dateSelector), 1)) }}
        // maxDomain={{ x: Number(addMonths(new Date(dateSelector), 1)) }}
        domain={{
          x: [
            subMonths(new Date(dateSelector), 1),
            addMonths(new Date(dateSelector), 1),
          ],
        }}
        data={data.sort().map((ele) => ele)}
      />
    </VictoryChart>
  );
};

export default MainLineChart;
