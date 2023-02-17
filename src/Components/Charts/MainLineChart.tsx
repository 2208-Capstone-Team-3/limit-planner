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
import { useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";

const MainLineChart = () => {
  const theme = useTheme();
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
    scale={{ x: "time", y: "linear" }}
    padding={{top: 0, bottom: 60, left: 60, right : 0}}
      domain={{
        x: [
          subMonths(new Date(dateSelector), 1),
          addMonths(new Date(dateSelector), 1),
        ],
      }}
      
      title={"Account Progression"}
      key="LineChartMainContainer"
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 },
      }}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiPadding={{top: 0, bottom: 60, left: 60, right : 0}}
          labels={({ datum }) =>
            `${
              typeof datum.x === "object"
                ? datum.x.toLocaleDateString()
                : datum.x
            }, $${datum.y}`
          }
          theme={VictoryTheme.material}
          voronoiDimension={"x"}
          key="LineChartVoronoiContainer"
        />
      }
    >
      <VictoryLine
        style={{
          data: {
            stroke: () =>
              theme.palette.mode === "light" ? blueGrey[500] : deepOrange[900],
          },
        }}
        interpolation="linear"
        name="line"
        key="LineChartMain"
        minDomain={{ x: Number(subMonths(new Date(dateSelector), 1)) }}
        maxDomain={{ x: Number(addMonths(new Date(dateSelector), 1)) }}
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
