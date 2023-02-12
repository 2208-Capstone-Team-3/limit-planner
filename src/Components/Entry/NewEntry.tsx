import React, { useState, BaseSyntheticEvent } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { Box, TextField, Select, MenuItem, FormControl, SelectChangeEvent, InputLabel, Button } from '@mui/material';
import { setReoccurEntries } from "../../store/reoccurEntriesSlice";
import { setEntries} from "../../store/entriesSlice";
import makeEntryCopies from "./../../helpers/makeEntryCopies";
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

const NewEntry = ({accountId}:props) => {
    const dispatch = useDispatch();
    const [entryType, setEntryType] = useState<string>("User");
    const [amount, setAmount] = useState<number|string>("");
    const [creditDebit, setCreditDebit] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [start, setStart] = useState<Dayjs|null>(null);
    const [allDay, setAllDay] = useState<boolean>(true);
    const [note, setNote] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("");
    
    // const handleTypeChange = (event: SelectChangeEvent<string> ) => {
    //     setEntryType(event.target.value);
    // };
    const handleAmountChange = (event: BaseSyntheticEvent ) => {
        setAmount(event.target.value);
    };
    const handleCreditDebitChange = (event: SelectChangeEvent<string>) => {
        setCreditDebit(event.target.value);
    };
    const handleTitleChange = (event: BaseSyntheticEvent ) => {
        setTitle(event.target.value);
    };
    const handleNoteChange = (event: BaseSyntheticEvent ) => {
        setNote(event.target.value);
    };
    const handleDateChange = (newDate: Dayjs|null) => {
        setStart(newDate);
    };
    const handleFrequencyChange = (event: SelectChangeEvent<string> ) => {
        setFrequency(event.target.value);
    };

    const submitEntry = async() => {
        const body = {
            entryType,amount,creditDebit,title,note,start,allDay,frequency,accountId
        };
        const token = window.localStorage.getItem("token");
        if(token){
            await axios.post('/api/entries',body, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const updatedEntries = await axios.get("/api/entries", {
                headers: { Authorization: "Bearer " + token }
              })
            dispatch(setEntries(updatedEntries.data));
            const updatedEntryCopies = makeEntryCopies(updatedEntries.data)
            dispatch(setReoccurEntries(updatedEntryCopies)); 
        };
        setAmount("");
        setCreditDebit("");
        setTitle("");
        setNote("");
        setStart(null);
        setFrequency("");
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
        <TextField sx={inputStyle} id="outlined-basic" label="Amount" variant="outlined" value={amount} onChange={handleAmountChange} />
        <FormControl sx={inputStyle}>
            <InputLabel htmlFor="credit/debit">Entry Type</InputLabel>
            <Select id="credit/debit" label="Credit/Debit" value={creditDebit} onChange={handleCreditDebitChange}>
                <MenuItem value="Credit">Credit +</MenuItem>
                <MenuItem value="Debit">Debit -</MenuItem>
            </Select>
        </FormControl>
        {/* input for start date */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={start}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} sx={inputStyle}/>}
            />
        </LocalizationProvider>
        {/* input for title */}
        <TextField sx={inputStyle} id="outlined-basic" label="Title" variant="outlined" value={title} onChange={handleTitleChange} />
        {/* input for note */}
        <TextField sx={inputStyle} id="outlined-basic" label="Note" variant="outlined" value={note} onChange={handleNoteChange} />
        {/* input for frequency */}
        <FormControl sx={inputStyle}>
            <InputLabel htmlFor="frequency">Entry Type</InputLabel>
            <Select id="frequency" label="Frequency" value={frequency} onChange={handleFrequencyChange}>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Bi-Weekly">Every two weeks</MenuItem>
                <MenuItem value="Weekly">Once a week</MenuItem>
                <MenuItem value="ByDate">Single day event</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" onClick={submitEntry}>Submit</Button>
    </Box>
    );
};

export default NewEntry;
