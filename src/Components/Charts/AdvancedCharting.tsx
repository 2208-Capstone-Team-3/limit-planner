import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAccountSelector, setGoalSelector } from "../../store/themeSlice";
import MainGoalPercentageChart from "./MainGoalPercentageChart";
import MainHistogram from "./MainHistogram";
import MainLineChart from "./MainLineChart";
import MainScatterChart from "./MainScatterChart";

const AdvancedCharting = () => {
  const dispatch = useDispatch();
  let accounts = useSelector((state: RootState) => state.accounts.accounts);
  let goals = useSelector((state: RootState) => state.goals.goals);
  let accountSelector = useSelector(
    (state: RootState) => state.theme.theme.accountSelector
  );
  let goalSelector = useSelector(
    (state: RootState) => state.theme.theme.goalSelector
  );

  const handleAccount = (ele: SelectChangeEvent) => {
    dispatch(setAccountSelector(ele.target.value));
  };

  const handleGoal = (ele: SelectChangeEvent) => {
    dispatch(setGoalSelector(ele.target.value));
  };
  const allGoals = goals.flat(Infinity).map((ele) => ele);
  const [chartSelected, setChartSelected] = useState<string | null>(null);

  const handleChartSelect = (e: SelectChangeEvent) => {
    setChartSelected(e.target.value);
  };

  return (
    <Grid2 container>
      <Grid2 container xs={2} direction="column">
        <Grid2 xs={12}>
          <Box display={"flex"} sx={{placeContent: "center"}}>
            <Typography  variant="h3">Selectors</Typography>
          </Box>
        </Grid2>
        <Divider sx={{marginBottom: 1}}/>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <InputLabel id={"chartSelectLabel"}>Chart Type</InputLabel>
            <Select
              labelId="chartSelectLabel"
              value={chartSelected ?? undefined}
              renderValue={(ele) => <Typography>{ele}</Typography>}
              onChange={handleChartSelect}
            >
              <MenuItem value={"Line Chart"}>Line Chart</MenuItem>
              <MenuItem value={"Goal Chart"}>Goal Chart</MenuItem>
              <MenuItem value={"Histogram"}>Histogram</MenuItem>
              <MenuItem value={"Scatter Chart"}>Scatter Chart</MenuItem>
            </Select>
          </FormControl>
          <FormControl key={"accountFormControl"} fullWidth>
            <InputLabel id="accountSelectLabel">Account</InputLabel>
            <Select
              key={"accountSelect"}
              fullWidth
              labelId="accountSelectLabel"
              id="accountSelect"
              value={accountSelector ?? "Account"}
              renderValue={(ele) => <Typography>{ele}</Typography>}
              label="Account"
              onChange={handleAccount}
            >
              {accounts.map((ele, id) => (
                <MenuItem key={`${ele.id}` + id} value={ele.accountName}>
                  {ele.accountName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <InputLabel id="goalSelectLabel">Goal</InputLabel>
            <Select
              key={"goalSelect"}
              fullWidth
              labelId="goalSelectLabel"
              id="goalSelect"
              value={goalSelector ?? ""}
              renderValue={(ele) => <Typography>{ele}</Typography>}
              label="Goal"
              onChange={handleGoal}
            >
              {allGoals.map((ele, id) => (
                <MenuItem key={`${ele.id}` + id} value={ele.name}>
                  {ele.name ?? "None"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
      <Grid2
        sx={{ display: "flex", placeContent: "center" }}
        paddingTop={5}
        height={"95vh"}
        xs={10}
      >
        {chartSelected === "Line Chart" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              sx={{ marginLeft: "15%", paddingBottom: 1 }}
              variant="overline"
            >
              Account Progression
            </Typography>
            <MainLineChart />
          </Box>
        ) : chartSelected === "Goal Chart" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              sx={{ marginLeft: "15%", paddingBottom: 1 }}
              variant="overline"
            >
              Goal Progress
            </Typography>
            <MainGoalPercentageChart />
          </Box>
        ) : chartSelected === "Histogram" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              sx={{ marginLeft: "15%", paddingBottom: 1 }}
              variant="overline"
            >
              Number of Transactions
            </Typography>
            <MainHistogram />
          </Box>
        ) : chartSelected === "Scatter Chart" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              sx={{ marginLeft: "15%", paddingBottom: 1 }}
              variant="overline"
            >
              Map of Relative Transaction Size
            </Typography>
            <MainScatterChart />
          </Box>
        ) : (
          <Typography variant="h2">Select a Chart</Typography>
        )}
      </Grid2>
    </Grid2>
  );
};

export default AdvancedCharting;
