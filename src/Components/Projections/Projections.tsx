import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { RootState } from "../../store";

const ProjectionsComponent = () => {
  const reoccurEntries = useSelector(
    (state: RootState) => state.reoccurEntries.reoccurEntries
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const theme = useSelector((state: RootState) => state.theme);
  const todayDate = useMemo(() => new Date(), []);
  const endDate = theme.theme.dateSelector;
  const [projAmount, setProjAmount] = useState("0");

  const projectionAmount = useCallback(() => {
    if (reoccurEntries.length) {
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
    }
  }, [accounts, endDate, reoccurEntries, todayDate]);

  useEffect(() => {
    projectionAmount();
  }, [projectionAmount, theme]);

  const currentBalance = accounts[0].balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (reoccurEntries.length === 0) { 
    return (
    <Box>
      <Typography component={"h3"} variant="h4">Current Balance: {currentBalance} </Typography> 
      <Typography component={"h3"} variant="h5">Add Entries to get your projected balance </Typography>
  </Box>
    )}
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <Typography component={"h3"} variant="h4">Current Balance: {currentBalance}</Typography>
      {new Date(endDate).toLocaleDateString() === new Date().toLocaleDateString() ? (
        <Typography component={"h3"} variant="h5">
          Click on date for projected balance
        </Typography>
      ) : (
        <Typography component={"h3"} variant="h5">{`Projected Balance for ${new Date(
          endDate
        ).toLocaleDateString()} is: ${projAmount}`}</Typography>
      )}
    </Box>
  );
};



export default ProjectionsComponent;