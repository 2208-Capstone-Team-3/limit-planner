import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { RootState } from "../../store";

const ProjectionsComponent = () => {
  // const theme = useTheme();
  const reoccurEntries = useSelector(
    (state: RootState) => state.reoccurEntries.reoccurEntries
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
const dateSelector = useSelector((state: RootState) => state.theme.theme.dateSelector)
  const todayDate = useMemo(() => new Date(), []);
  const [projAmount, setProjAmount] = useState("0");

  const projectionAmount = useCallback(() => {
    if (reoccurEntries.length) {
      let filtered = reoccurEntries.filter(
        (entry) =>
          new Date(entry.start).getTime() <= new Date(dateSelector).getTime() &&
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
  }, [accounts, dateSelector, reoccurEntries, todayDate]);

  useEffect(() => {
    projectionAmount();
  }, [projectionAmount]);

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
      {new Date(dateSelector).toLocaleDateString() === new Date().toLocaleDateString() ? (
        <Typography component={"h3"} variant="h5">
          Click on date for projected balance
        </Typography>
      ) : (
        <Typography component={"h3"} variant="h5">{`Projected Balance for ${new Date(
          dateSelector
        ).toLocaleDateString()} is: ${projAmount}`}</Typography>
      )}
    </Box>
  );
};



export default ProjectionsComponent;