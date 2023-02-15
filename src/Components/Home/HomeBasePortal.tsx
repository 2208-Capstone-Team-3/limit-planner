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

  useEffect(() => {}, [homeDrawerOpen]);

  return (
    <Grid2 container height={"100%"} width={"auto"} padding={0.5}>
      <Grid2 xs={5} padding={1}>
        <Selectors />
        <Calendar />
        <ProjectionsComponent />
      </Grid2>
      <Grid2 container height={"100vh"} xs={7} padding={1}>
        <Grid2 xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography variant="overline">Account Progression</Typography>
            <MainLineChart />
          </Box>
        </Grid2>
        <Grid2
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
          }}
        >
          <Typography variant="overline">Percent To Goal</Typography>
          <MainGoalPercentageChart />
        </Grid2>
        <Grid2
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
          }}
        >
          <Typography variant="overline">Transactions Per Month</Typography>
          <MainHistogram />
        </Grid2>
        <Grid2
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
          }}
        >
          <Typography variant="overline">Expenses</Typography>
          <MainScatterChart />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default HomeBasePortal;
