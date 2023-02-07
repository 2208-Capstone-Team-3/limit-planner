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
  let accounts = useSelector((state: RootState) => state.accounts.accounts);
  let dateSelector = useSelector(
    (state: RootState) => state.theme.theme.dateSelector
  );
  // console.log(entries);
  const data: { x: any; y: any }[] = [];
  let accountTotal = 0;
  // console.log(accounts);
  entries
    .flat(Infinity)
    .forEach(
      (ele: { start: Date; amount: number; creditDebit: string }, id, arr) => {
        data.push({
          x: new Date(ele.start),
          y:
            ele.creditDebit === "Credit"
              ? (accountTotal += ele.amount)
              : (accountTotal -= ele.amount),
        });
      }
    );
  // const startSelected: Tuple<Date> = [
  //   subMonths(new Date(dateSelector), 3),
  //   addMonths(new Date(dateSelector), 3),
  // ];
  // let currentSelected = useRef({
  //   x: startSelected,
  // });

  // useEffect(() => {
  //   currentSelected.current = {
  //     x: [
  //       subMonths(new Date(dateSelector), 3),
  //       addMonths(new Date(dateSelector), 3),
  //     ],
  //   };
  //   console.log(currentSelected)
  // }, [dateSelector]);

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
          labels={({ datum }) => `${datum.x.toDateString()}, $${datum.y}`}
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
