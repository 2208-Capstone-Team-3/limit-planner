import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import Selectors from "../Home/Selectors";
import MainGoalPercentageChart from "./MainGoalPercentageChart";
import MainHistogram from "./MainHistogram";
import MainLineChart from "./MainLineChart";
import MainScatterChart from "./MainScatterChart";

const AdvancedCharting = () => {
  const [chartSelected, setChartSelected] = useState<string | null>(null);

  const handleChartSelect = (e: SelectChangeEvent) => {
    setChartSelected(e.target.value);
  };

  return (
    <Box>
      <Grid2 container>
        <Grid2 padding={2} height={"100vh"} xs={2}>
          <Typography variant="h3">Selectors</Typography>
          <FormControl>
            <Select
              value={chartSelected ?? "Select a Chart"}
              renderValue={(ele) => <Typography>{ele}</Typography>}
              onChange={handleChartSelect}
            >
              <MenuItem value={"Line Chart"}>Line Chart</MenuItem>
              <MenuItem value={"Goal Chart"}>Goal Chart</MenuItem>
              <MenuItem value={"Histogram"}>Histogram</MenuItem>
              <MenuItem value={"Scatter Chart"}>Scatter Chart</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
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
    </Box>
  );
};

export default AdvancedCharting;
