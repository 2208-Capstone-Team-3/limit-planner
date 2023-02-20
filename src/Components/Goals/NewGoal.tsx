import React, { useState, BaseSyntheticEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Box, TextField, FormControl, Button } from "@mui/material";
import { setGoals } from "../../store/goalsSlice";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface props {
  accountId: string | undefined;
}

const NewGoal = ({ accountId }: props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // const handleTypeChange = (event: SelectChangeEvent<string> ) => {
  //     setEntryType(event.target.value);
  // };
  const handleGoalAmountChange = (event: BaseSyntheticEvent) => {
    setGoalAmount(event.target.value);
  };

  const handleNameChange = (event: BaseSyntheticEvent) => {
    setName(event.target.value);
  };

  const handleEndDateChange = (newDate: Dayjs | null) => {
    setEndDate(newDate);
  };

  const submitGoal = async () => {
    const body = {
      name,
      goalAmount,
      endDate,
      accountId,
    };
    const token = window.localStorage.getItem("token");
    if (token) {
      await axios.post("/api/goals", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const updatedGoals = await axios.get("/api/goals", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(setGoals(updatedGoals.data));
    }
    setGoalAmount(null);

    setName("");

    setEndDate(null);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <Grid2 container spacing={1} sx={{ padding: "5%", gap: 1, placeContent: "center" }}>
        {/* input for Credit/Debit */}
        <Grid2 xs={3}>
          <FormControl fullWidth >
            <TextField
              
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              value={goalAmount}
              onChange={handleGoalAmountChange}
            />
          </FormControl>
        </Grid2>
        {/* input for start date */}
        <Grid2 xs={3}>
          <FormControl fullWidth >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField {...params}  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid2>
        {/* input for name */}
        <Grid2 xs={3}>
          <FormControl fullWidth >
            <TextField
              
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
        </Grid2>
      </Grid2>
      <Button
        sx={{ width: "10vw" }}
        size="large"
        variant="contained"
        onClick={submitGoal}
      >
        Submit
      </Button>
    </Box>
  );
};

export default NewGoal;
