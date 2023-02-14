import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addDays, formatDistance } from "date-fns";
import {
  Box,
  CircularProgress,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import { RootState } from "../../store";
// import { RootState } from "../../store";

const ProjectionsComponent = () => {
  const reoccurEntries = useSelector(
    (state: RootState) => state.reoccurEntries.reoccurEntries
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const theme = useSelector((state: RootState) => state.theme);
  const todayDate = new Date();
  const endDate = theme.theme.dateSelector;

  console.log("console log ", todayDate);

  const [projAmount, setProjAmount] = useState("0");

  const projectionAmount = () => {
    let filtered = reoccurEntries.filter(
      (entry) =>
        new Date(entry.start).getTime() <= new Date(endDate).getTime() &&
        new Date(entry.start).getTime() >= new Date(todayDate).getTime()
    );
    let mapped = filtered.map((entry) =>
      entry.creditDebit === "Credit" ? entry.amount : entry.amount * -1
    );
    let reduced = mapped.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, accounts[0].balance);
    let sum = reduced.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    setProjAmount(sum);
  };

  useEffect(() => {
    projectionAmount();
  }, [theme]);

  const currentBalance = accounts[0].balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (reoccurEntries.length === 0) return <CircularProgress />;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <Typography variant="h4">Current Balance: {currentBalance}</Typography>
      {endDate === "05-05-2023" ? (
        <Typography variant="h5">
          Click on date for projected balance
        </Typography>
      ) : (
        <Typography variant="h5">{`Projected Balance for ${new Date(
          endDate
        ).toLocaleDateString()} is: ${projAmount}`}</Typography>
      )}
    </Box>
  );
};

export default ProjectionsComponent;
