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
import { setAccountSelector } from "../../store/themeSlice";

const Selectors = () => {
  const dispatch = useDispatch();
  let accounts = useSelector((state: RootState) => state.accounts.accounts);
  let accountSelector = useSelector(
    (state: RootState) => state.theme.theme.accountSelector
  );

  const handleAccount = (ele: SelectChangeEvent) => {
    dispatch(setAccountSelector(ele));
  };

  return (
    <Grid2 container>
      <Grid2>
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
              <MenuItem value={ele.accountName.toString()}>{ele.accountName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
    </Grid2>
  );
};

export default Selectors;
