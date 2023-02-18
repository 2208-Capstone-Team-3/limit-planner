import React, { useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MainGoalPercentageChart from "../Charts/MainGoalPercentageChart";
import MainLineChart from "../Charts/MainLineChart";
import Selectors from "./Selectors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProjectionsComponent from "../Projections/Projections";
import MainHistogram from "../Charts/MainHistogram";
import MainScatterChart from "../Charts/MainScatterChart";
import { Box, Typography } from "@mui/material";
import Calendar from "../Calendar/Calendar";

const HomeBasePortal = () => {
  const homeDrawerOpen: boolean = useSelector(
    (state: RootState) => state.theme.theme.homeDrawerOpen
  );
  let goalSelector = useSelector(
    (state: RootState) => state.theme.theme.goalSelector
  );

  useEffect(() => {}, [homeDrawerOpen]);

  return (
    <Grid2 container paddingLeft={1} height={"90vh"}>
      <Grid2 container xs={5} height={"90vh"}>
        <Grid2 xs={12}>
          <Selectors />
        </Grid2>
        <Grid2 xs={12}>
          <Calendar />
        </Grid2>
        <Grid2 xs={12}>
          <ProjectionsComponent />
        </Grid2>
      </Grid2>
      <Grid2 container xs={7} height={"90vh"}>
        <Grid2
          xs={6}
          height={"44%"}
          sx={{
            display: "flex",
            placeItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginLeft: "15%" }} variant="overline">
            Account Progression
          </Typography>
          <MainLineChart />
        </Grid2>
        <Grid2
          xs={6}
          height={"44%"}
          sx={{
            display: "flex",
            placeItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginLeft: "15%" }} variant="overline">
            Percent To Goal
          </Typography>
          <MainGoalPercentageChart />
        </Grid2>
        <Grid2
          xs={6}
          height={"44%"}
          sx={{
            display: "flex",
            placeItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginLeft: "15%" }} variant="overline">
            Transactions Per Month
          </Typography>
          <MainHistogram />
        </Grid2>
        <Grid2
          xs={6}
          height={"44%"}
          sx={{
            display: "flex",
            placeItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginLeft: "15%" }} variant="overline">
            Expenses
          </Typography>
          <MainScatterChart />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default HomeBasePortal;
