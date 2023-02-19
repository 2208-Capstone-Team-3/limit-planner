import React, { SyntheticEvent } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  FormControl,
  FormLabel,
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
    dispatch(setAccountSelector(JSON.parse(ele.target.value)));
  };

  const handleGoal = (ele: SelectChangeEvent) => {
    dispatch(setGoalSelector(JSON.parse(ele.target.value)));
  };

  const allGoals = goals.flat(Infinity).map((ele) => ele);
  return (
    <Grid2 container padding={1}>
      <Grid2 xs={6} paddingRight={1}>
        <FormControl key={"accountFormControl"} fullWidth>
          <InputLabel id="accountSelectLabel">Account</InputLabel>
          <Select
            key={"accountSelect"}
            fullWidth
            labelId="accountSelectLabel"
            value={accountSelector ? JSON.stringify(accountSelector) : ""}
            id="accountSelect"
            renderValue={(
              ele:
                | {
                    goals?: [] | undefined;
                    entries?: [] | undefined;
                    userId?: string | undefined;
                    id?: string | undefined;
                    accountType: string;
                    accountName: string;
                    institution: string;
                    balance: number;
                  }
                | string
            ) => (
              <Typography>
                {typeof ele === "string" ? JSON.parse(ele).accountName : ele.accountName}
              </Typography>
            )}
            onChange={handleAccount}
          >
            {accounts.map((ele, id) => (
              <MenuItem key={`${ele.id}` + id} value={JSON.stringify(ele)}>
                {ele.accountName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 xs={6} paddingRight={1}>
        <FormControl fullWidth>
          <InputLabel id="goalSelectLabel">Goal</InputLabel>
          <Select
            key={"goalSelect"}
            fullWidth
            labelId="goalSelectLabel"
            id="goalSelect"
            value={goalSelector ? JSON.stringify(goalSelector) : ""}
            renderValue={(
              ele:
                | {
                    id?: string | undefined;
                    name: string;
                    goalAmount: number;
                    endDate: string | Date;
                    victory: boolean;
                  }
                | string
            ) => (
              <Typography>
                {typeof ele === "string" ? JSON.parse(ele).name : ele.name}
              </Typography>
            )}
            label="Goal"
            onChange={handleGoal}
          >
            {allGoals.map((ele, id) => (
              <MenuItem key={`${ele.id}` + id} value={JSON.stringify(ele)}>
                {ele.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
    </Grid2>
  );
};

export default Selectors;
