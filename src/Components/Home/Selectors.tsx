import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setAccountSelector, setGoalSelector } from "../../store/themeSlice";

const Selectors = () => {
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

  return (
    <Grid2 container padding={1}>
      <Grid2 paddingRight={1}>
        <FormControl fullWidth>
          <InputLabel id="accountSelectLabel">Account</InputLabel>
          <Select
            fullWidth
            labelId="accountSelectLabel"
            id="accountSelect"
            value={accountSelector}
            renderValue={(ele) => <Typography>{ele}</Typography>}
            label="Account"
            onChange={handleAccount}
          >
            {accounts.map((ele, id) => (
              <MenuItem value={ele.accountName}>{ele.accountName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 paddingRight={1}>
        <FormControl fullWidth>
          <InputLabel id="goalSelectLabel">Goal</InputLabel>
          <Select
            fullWidth
            labelId="goalSelectLabel"
            id="goalSelect"
            value={goalSelector}
            renderValue={(ele) => <Typography>{ele}</Typography>}
            label="Goal"
            onChange={handleGoal}
          >
            {goals.map((ele, id) => (
              <MenuItem value={ele.name}>{ele.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
    </Grid2>
  );
};

export default Selectors;
