import React, { useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MainGoalPercentageChart from "../Charts/MainGoalPercentageChart";
import MainLineChart from "../Charts/MainLineChart";
import Calendar from "./Calendar";
import Selectors from "./Selectors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MainHistogram from "../Charts/MainHistogram";
import MainScatterChart from "../Charts/MainScatterChart";

const HomeBasePortal = () => {
  const homeDrawerOpen: boolean = useSelector(
    (state: RootState) => state.theme.theme.homeDrawerOpen
  );

  useEffect(() => {}, [homeDrawerOpen]);

  return (
    <Grid2 container height={"100%"} width={"auto"} padding={0.5}>
      <Grid2 xs={5} padding={1}>
        <Selectors />
        <Calendar />
      </Grid2>
      <Grid2
        container
        height={"100vh"}
        xs={7}
        padding={1}
        flexDirection={"column"}
      >
        <Grid2>
          <MainLineChart />
        </Grid2>
        <Grid2>
          <MainGoalPercentageChart />
        </Grid2>
        <Grid2>
          <MainHistogram />
        </Grid2>
        <Grid2>
          <MainScatterChart />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default HomeBasePortal;
