import React, { useEffect, useMemo, useRef } from "react";
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
  const entries = useSelector(
    (state: RootState) => state.theme.theme.filteredEntries
  );

  let dateSelector = useSelector(
    (state: RootState) => state.theme.theme.dateSelector
  );
  let accountBalance = useSelector(
    (state: RootState) => state.theme.theme.accountSelector?.balance
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  const accountTotal = useRef(0);
  const allAccountBalance = accounts.reduce((a, b) => a + b.balance, 0);
  accountTotal.current = accountBalance ? accountBalance : allAccountBalance;

  const data = useMemo(() => {
    const data: { x: Date; y: number }[] = [];

    entries
      .flat(Infinity)
      .forEach((ele: { start: Date; amount: number; creditDebit: string }) => {
        data.push({
          x: new Date(ele.start),
          y:
            ele.creditDebit === "Credit"
              ? (accountTotal.current += ele.amount)
              : (accountTotal.current -= ele.amount),
        });
      });

    return data;
  }, [entries, entries.length]);

  

  return (
    <VictoryChart
      scale={{ x: "time", y: "linear" }}
      padding={{ top: 10, bottom: 30, left: 30, right: 0 }}
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
      standalone
      containerComponent={
        <VictoryVoronoiContainer
          voronoiPadding={{ top: 10, bottom: 30, left: 30, right: 0 }}
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
          activateData
          activateLabels
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
        standalone
        key="LineChartMain"
        minDomain={{ x: Number(subMonths(new Date(dateSelector), 1)) }}
        maxDomain={{ x: Number(addMonths(new Date(dateSelector), 1)) }}
        domain={{
          x: [
            subMonths(new Date(dateSelector), 1),
            addMonths(new Date(dateSelector), 1),
          ],
        }}
        data={[...data]}
      />
    </VictoryChart>
  );
};

export default MainLineChart;
