import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import React, { BaseSyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccounts } from "../../store/accountsSlice";

const NewAccount = () => {
  // const {
  //     accountType,
  //     accountName,
  //     institution,
  //     balance,
  //   }

  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [institution, setInstitution] = useState<string>("");

  // const handleTypeChange = (event: SelectChangeEvent<string> ) => {
  //     setEntryType(event.target.value);
  // };
  const handleBalanceChange = (event: BaseSyntheticEvent) => {
    setBalance(event.target.value);
  };

  const handleAccountNameChange = (event: BaseSyntheticEvent) => {
    setAccountName(event.target.value);
  };

  const handleAccountTypeChange = (event: BaseSyntheticEvent) => {
    setAccountType(event.target.value);
  };
  const handleInstitutionChange = (event: BaseSyntheticEvent) => {
    setAccountType(event.target.value);
  };

  const submitAccount = async () => {
    const body = {
      accountType,
      accountName,
      institution,
      balance,
    };
    const token = window.localStorage.getItem("token");
    if (token) {
      await axios.post("/api/accounts", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const updatedGoals = await axios.get("/api/accounts", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(setAccounts(updatedGoals.data));
    }
    setInstitution("");
    setBalance(null);
    setAccountType("");
    setAccountName("");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
        <Typography variant="h2">New Account</Typography>
      <Grid2
        container
        spacing={1}
        sx={{ padding: "5%", gap: 1, placeContent: "center" }}
      >
        {/* input for accountType */}
        <Grid2 xs={3}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Type of Account"
              variant="outlined"
              value={balance}
              onChange={handleAccountTypeChange}
            />
          </FormControl>
        </Grid2>
        {/* input for Institution */}
        <Grid2 xs={3}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Institution"
              variant="outlined"
              value={institution}
              onChange={handleInstitutionChange}
            />
          </FormControl>
        </Grid2>
        {/* input for accountName */}
        <Grid2 xs={3}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Account Name"
              variant="outlined"
              value={balance}
              onChange={handleAccountNameChange}
            />
          </FormControl>
        </Grid2>
        {/* input for Balance */}
        <Grid2 xs={3}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Balance"
              variant="outlined"
              value={balance}
              onChange={handleBalanceChange}
            />
          </FormControl>
        </Grid2>
      </Grid2>
      <Button
        sx={{ width: "10vw" }}
        size="large"
        variant="contained"
        onClick={submitAccount}
      >
        Submit
      </Button>
    </Box>
  );
};

export default NewAccount;
