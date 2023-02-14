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
  const entries = useSelector((state: RootState) => state.entries.entries);
  const data: { x: Date; y: number; amount: number }[] = [];
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
          amount: ele.creditDebit === "Credit" ? ele.amount : -ele.amount,
        });
      }
    );

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryZoomContainer theme={VictoryTheme.material} />
      }
    >
      <VictoryScatter
      name="ScatterChart"
        size={({ datum }) => datum.amount / 1000}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        style={{
          data: { fill: "#c43a31" },
        }}
        data={data.sort().map((ele) => {
          return { x: ele.x, y: ele.y, amount: ele.amount };
        })}
        //     labels={({ datum }) =>
        //     `${new Date(datum.x).toLocaleDateString(undefined, {
        //       month: "long",
        //     })}, $${datum.amount}`
        //   }
      ></VictoryScatter>
    </VictoryChart>
  );
};

export default MainScatterChart;
