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
import { Typography } from "@mui/material";
import Calendar from "../Calendar/Calendar";

const HomeBasePortal = () => {
  const homeDrawerOpen: boolean = useSelector(
    (state: RootState) => state.theme.theme.homeDrawerOpen
  );

  useEffect(() => {}, [homeDrawerOpen]);

  return (
    <Grid2 container height={"85%"} paddingLeft={0.5}>
      <Grid2 container height={"100%"} xs={5}>
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
      <Grid2 container padding={1} xs={7}>
        <Grid2 container xs={6}>
          <Grid2 sx={{ display: "flex", placeContent: "center" }} xs={12}>
            <Typography sx={{marginLeft: "15%"}} variant="overline">Account Progression</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <MainLineChart />
          </Grid2>
        </Grid2>
        <Grid2 container xs={6}>
          <Grid2 sx={{ display: "flex", placeContent: "center" }} xs={12}>
            <Typography sx={{marginLeft: "15%"}} variant="overline">Percent To Goal</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <MainGoalPercentageChart />
          </Grid2>
        </Grid2>
        <Grid2 container xs={6}>
          <Grid2 sx={{ display: "flex", placeContent: "center" }} xs={12}>
            <Typography sx={{marginLeft: "15%"}}  variant="overline">Transactions Per Month</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <MainHistogram />
          </Grid2>
        </Grid2>
        <Grid2 container xs={6}>
          <Grid2 sx={{ display: "flex", placeContent: "center" }} xs={12}>
            <Typography sx={{marginLeft: "15%"}} variant="overline">Expenses</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <MainScatterChart />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default HomeBasePortal;
