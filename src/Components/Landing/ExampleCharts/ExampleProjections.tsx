import React, { useState } from "react";
import {
  Box,
  Card,
  Container,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { differenceInCalendarDays } from "date-fns";

const ExampleProjections = () => {
  const [selectDate, setSelectDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [perDiem, setPerDiem] = useState<number | null>(100);
  const total =
    differenceInCalendarDays(
      selectDate ? selectDate.toDate() : new Date(),
      new Date()
    ) * (perDiem ?? 100);
  return (
    <Card sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker
          date={selectDate}
          onChange={(newDate) => setSelectDate(newDate)}
        ></CalendarPicker>
      </LocalizationProvider>
      <Divider />
      <FormControl variant="standard">
        <FormLabel>Earnings Per Diem</FormLabel>
        <TextField
          value={perDiem}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(ele) =>
            setPerDiem(
              !Number.isNaN(Number(ele.target.value))
                ? Number(ele.target.value)
                : 0
            )
          }
        />
      </FormControl>
      <Divider />
          <Typography fontSize={"2em"} variant="body2">Totals:</Typography>
        <Paper variant="outlined">
          <Typography fontSize={"1.5em"} variant="body2">Current Total: $0</Typography>
          <Divider />
          <Typography fontSize={"1.5em"} variant="body2">
            {`Projection: $${Math.sign(total) === -1 ? 0 : total.toFixed(2)}
        `}
          </Typography>
        </Paper>
    </Card>
  );
};

export default ExampleProjections;
