import React, { FC, useState, BaseSyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Box, Input, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import axios from "axios";
import singleEntrySlice from "../../store/singleEntrySlice";




export const EntryComponent: FC = () => {

    const dispatch = useDispatch();

    

    
    const [entryType, setEntryType] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [creditDebit, setCreditDebit] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [note, setNote] = useState<string>("")
    const [frequency, setFrequency] = useState<string>("")

    
    const entryId = singleEntry.id
    const handleTypeChange = (event: SelectChangeEvent<string> ) => {
        setEntryType(event.target.value)
    }
    const handleDateChange = (event: BaseSyntheticEvent ) => {
        setDate(event.target.value)
    }
    const handleCreditDebitChange = (event: SelectChangeEvent<string>) => {
        setCreditDebit(event.target.value)
    }
    const handleAmountChange = (event: BaseSyntheticEvent ) => {
        setAmount(event.target.value)
    }
    const handleTitleChange = (event: BaseSyntheticEvent ) => {
        setTitle(event.target.value)
    }
    const handleNoteChange = (event: BaseSyntheticEvent ) => {
        setNote(event.target.value)
    }
    const handleFrequencyChange = (event: SelectChangeEvent<string> ) => {
        setFrequency(event.target.value)
    }
     


  

    const handleSubmit = async (event: BaseSyntheticEvent) => {
        event.preventDefault();
        //how do i set this req.body as entryReqBody?
        await axios.post("/api/entry", {
            //need account redux state
            entryId,
            entryType,
            date,
            creditDebit,
            amount,
            title,
            note,
            frequency

        });
        
      };



    return(
    <Box sx={{ display: "flex" }}>
         <Select value={accountId} style={{ marginTop: 100, marginLeft: 100 }} onChange={handleAccountChange}>
        
            {user.accounts.map(account => <MenuItem key={account.id}value={account.id}>{account.name}</MenuItem>)}

            
           
        </Select>

        <Select value={entryType} style={{ marginTop: 100, marginLeft: 100 }} onChange={handleTypeChange}>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="API">API</MenuItem>
        </Select>

        <Input type="text" value={date} onChange={handleDateChange}></Input>

        <Select value={creditDebit} style={{ marginTop: 100, marginLeft: 100 }} onChange={handleCreditDebitChange}>
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Debit">Debit</MenuItem>
        </Select>

        <Input type="text" value={amount} onChange={handleAmountChange}></Input>
        <Input type="text" value={title} onChange={handleTitleChange}></Input>
        <Input type="text" value={note} onChange={handleNoteChange}></Input>

        <Select value={frequency} style={{ marginTop: 100, marginLeft: 100 }} onChange={handleFrequencyChange}>
            <MenuItem value="Weekly">Once a week</MenuItem>
            <MenuItem value="Biweekly">Every two weeks</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
           
        </Select>
         <Button onClick={handleSubmit}>Submit</Button>

    </Box>
    )
}