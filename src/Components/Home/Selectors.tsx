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
  const allGoals = goals.flat(Infinity).map((ele) => ele);
  return (
    <Grid2 container padding={1}>
      <Grid2 minWidth={"8vw"} paddingRight={1}>
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
              <MenuItem key={`${ele.id}` + id}  value={ele.accountName}>
                {ele.accountName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 minWidth={"6vw"} paddingRight={1}>
        <FormControl fullWidth>
          <InputLabel id="goalSelectLabel">Goal</InputLabel>
          <Select
            key={"goalSelect"}
            fullWidth
            labelId="goalSelectLabel"
            id="goalSelect"
            value={goalSelector}
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
  );
};

export default Selectors;
