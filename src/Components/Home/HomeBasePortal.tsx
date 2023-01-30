import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import MainGoalPercentageChart from "../Charts/MainGoalPercentageChart";
import MainLineChart from "../Charts/MainLineChart";

const HomeBasePortal = () => {
  return (
    <Grid2 container height={"90vh"} width={"auto"}>
        <Grid2 xs={6}>
            <div>Calendar Placeholder</div>
        </Grid2>
      <Grid2 xs={6}>
        <MainLineChart />
      </Grid2>
      <Grid2 xs={6}>
       <div>Selector Placeholder</div>
      </Grid2>
      <Grid2 xs={6}>
        <MainGoalPercentageChart />
      </Grid2>
    </Grid2>
  );
};

export default HomeBasePortal;
