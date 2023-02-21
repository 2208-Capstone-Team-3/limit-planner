import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { RootState } from "../../store";
import { setProjection } from '../../store/themeSlice';

const ProjectionsComponent = () => {
  const dispatch = useDispatch();
  const filteredEntries = useSelector(
    (state: RootState) => state.theme.theme.filteredEntries
  );
  const accountSelector = useSelector(
    (state: RootState) => state.theme.theme.accountSelector
  );

  const dateSelector = useSelector(
    (state: RootState) => state.theme.theme.dateSelector
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  const todayDate = useMemo(() => new Date(), []);
  const [projAmount, setProjAmount] = useState("0");
  const allAccountBalance = accounts.reduce((a, b) => a + b.balance, 0);

  const projectionAmount = useCallback(() => {
    if (filteredEntries.length) {
      let filtered = filteredEntries.filter(
        (entry) =>
          new Date(entry.start).getTime() <= new Date(dateSelector).getTime() &&
          new Date(entry.start).getTime() >= new Date(todayDate).getTime()
      );
      let mapped = filtered.map((entry) =>
        entry.creditDebit === "Credit" ? entry.amount : -entry.amount
      );
      let reduced = mapped.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue;
        },
        accountSelector ? accountSelector.balance : allAccountBalance
      );

      dispatch(setProjection(reduced));

      let sum = reduced
        ? reduced.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : null;

      setProjAmount(sum);
    }
  }, [
    accountSelector,
    allAccountBalance,
    dateSelector,
    filteredEntries,
    todayDate,
    dispatch
  ]);

  useEffect(() => {
    projectionAmount();
  }, [projectionAmount]);

  const currentBalance = accountSelector
    ? accountSelector.balance.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    : allAccountBalance.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    if (new Date(dateSelector).getTime() < new Date(todayDate).getTime()) {
      return (
        <Box>
          <Typography component={"h3"} variant="h4">
            {`Current Balance: ${currentBalance}`}
          </Typography>
          <Typography component={"h3"} variant="h5">
            Please select a future date
          </Typography>
        </Box>
      );
    }

  if (filteredEntries.length === 0) {
    return (
      <Box>
        <Typography component={"h3"} variant="h4">
          {`Current Balance: ${currentBalance}`}
        </Typography>
        <Typography component={"h3"} variant="h5">
          Add Entries to get your projected balance
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <Typography component={"h3"} variant="h4">
        {`Current Balance: ${currentBalance}`}
      </Typography>
      {new Date(dateSelector).toLocaleDateString() ===
      new Date().toLocaleDateString() ? (
        <Typography component={"h3"} variant="h5">
          Click on date for projected balance
        </Typography>
      ) : (
        <Typography
          component={"h3"}
          variant="h5"
        >{`Projected Balance for ${new Date(dateSelector).toLocaleDateString(
          "default"
        )} is: ${projAmount}`}</Typography>
      )}
    </Box>
  );
};

export default ProjectionsComponent;
