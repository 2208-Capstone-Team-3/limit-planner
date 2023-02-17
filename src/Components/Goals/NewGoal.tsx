import React, { useState, BaseSyntheticEvent } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { Box, TextField, Select, MenuItem, FormControl, SelectChangeEvent, InputLabel, Button } from '@mui/material';
import { setGoals } from "../../store/goalsSlice";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const inputStyle = {
    width:"150px"
};

interface props {
    accountId:string|undefined;
};

const NewGoal = ({accountId}:props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [goalAmount, setGoalAmount] = useState<number|null>(null);
    const [endDate, setEndDate] = useState<Dayjs|null>(null);

    
    // const handleTypeChange = (event: SelectChangeEvent<string> ) => {
    //     setEntryType(event.target.value);
    // };
    const handleGoalAmountChange = (event: BaseSyntheticEvent ) => {
        setGoalAmount(event.target.value);
    };
  
    const handleNameChange = (event: BaseSyntheticEvent ) => {
        setName(event.target.value);
    };
   
    const handleEndDateChange = (newDate: Dayjs|null) => {
        setEndDate(newDate);
    };
 
    const submitGoal = async() => {
        const body = {
            name,goalAmount,endDate,accountId
        };
        const token = window.localStorage.getItem("token");
        if(token){
            await axios.post('/api/goals',body, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const updatedGoals = await axios.get("/api/goals", {
                headers: { Authorization: "Bearer " + token }
              })
            dispatch(setGoals(updatedGoals.data));
            
        };
        setGoalAmount(null);
       
        setName("");
        
        setEndDate(null);
      
    };

    return(
    <Box sx={{ display: "flex" }}>
        {/* input for Entry type */}
        {/* <FormControl sx={inputStyle}>
            <InputLabel htmlFor="age-select">Entry Type</InputLabel>
            <Select id="age-select" label="Entry type" onChange={handleTypeChange}>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="API">API</MenuItem>
            </Select>
        </FormControl> */}
        {/* input for Credit/Debit */}
        <TextField sx={inputStyle} id="outlined-basic" label="Amount" variant="outlined" value={goalAmount} onChange={handleGoalAmountChange} />
        <FormControl sx={inputStyle}>
         
        </FormControl>
        {/* input for start date */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            label="End Date"
            inputFormat="MM/DD/YYYY"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} sx={inputStyle}/>}
            />
        </LocalizationProvider>
        {/* input for name */}
        <TextField sx={inputStyle} id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange} />
        
        <FormControl sx={inputStyle}>
            
        </FormControl>
        <Button variant="contained" onClick={submitGoal}>Submit</Button>
    </Box>
    );
};

export default NewGoal;
