import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MainGoalPercentageChart from "../Charts/MainGoalPercentageChart";
import MainLineChart from "../Charts/MainLineChart";
import Calendar from "./Calendar";
import Selectors from "./Selectors";

const HomeBasePortal = () => {
  return (
    <Grid2 container height={"90vh"} width={"auto"}>
        <Grid2  xs={6}>
            <Calendar />
        </Grid2>
      <Grid2 xs={6}>
        <MainLineChart />
      </Grid2>
      <Grid2 xs={6}>
       <Selectors />
      </Grid2>
      <Grid2 xs={6}>
        <MainGoalPercentageChart />
      </Grid2>
    </Grid2>
  );
};

export default HomeBasePortal;
