import React, { useCallback,useState,useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import NewEntry from "../Entry/NewEntry";
import { RootState } from "../../store";
import reoccurEntry from '../../store/reoccurEntriesSlice';
import { EntryAttributes } from '../../../server/db/models/Entry.model';
import { AccountAttributes } from '../../../server/db/models/Account.model';
// MUI Components
import {Box,CircularProgress,Container,Grid,Typography} from '@mui/material';

const SingleAccount = () => {
    const { accountId } = useParams();
    const reoccurEntries = useSelector((state:RootState) => state.reoccurEntries.reoccurEntries);
    const [loading,setLoading] = useState<boolean>(false);
    const [account,setAccount] = useState<AccountAttributes | null>(null);
    const [entries,setEntries] = useState<EntryAttributes[] | []>([]);
    const [lastCreditDate,setLastCreditDate] = useState<string>("");
    const [lastCreditAmount,setLastCreditAmount] = useState<number>(0);
    const [lastDebitDate,setLastDebitDate] = useState<string>("");
    const [lastDebitAmount,setLastDebitAmount] = useState<number>(0);

    const fetchAccount = useCallback(async() => {
        setLoading(true);
        const token = window.localStorage.getItem("token");
        if(token){
            const account = await axios.get(`/api/accounts/${accountId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if(account) setAccount(account.data);
            setLoading(false);
        };
    },[accountId]);

    /** sorting entries and find recent activity */
    const findRecentEntries = useCallback(() => {
        setLoading(true);
        let recentEntries = [...reoccurEntries];
        recentEntries = recentEntries.filter(entry=>{
            const diff = new Date().getTime() - new Date(entry.start).getTime();
            if(entry.accountId===accountId && diff>=0) return entry;
        });
        recentEntries.sort((a, b)=>{
            return new Date(b.start).getTime() - new Date(a.start).getTime();
        });
        setEntries(recentEntries)
        const lastCreditEntry = recentEntries.find(entry=>entry.creditDebit==='Credit');
        if(lastCreditEntry){
            setLastCreditDate(new Date(lastCreditEntry.start).toDateString());
            setLastCreditAmount(lastCreditEntry.amount);
        };
        const lastDebitEntry = recentEntries.find(entry=>entry.creditDebit==='Debit');
        if(lastDebitEntry){
            setLastDebitDate(new Date(lastDebitEntry.start).toDateString());
            setLastDebitAmount(lastDebitEntry.amount);
        };
        setLoading(false);
    },[accountId,reoccurEntries]);
    
    useEffect(()=>{
        fetchAccount();
        findRecentEntries();
    },[fetchAccount,findRecentEntries]);

    if (loading) return <CircularProgress />;
    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:'30px'}}>
          <Typography variant="h2">{account?.accountName}</Typography>
            <Container sx={{display: "flex", flexDirection: "column", placeItems: "center", placeContent: "center"}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                    <Grid xs={4}>
                        <Typography><b>Account type:</b> {account?.accountType}</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography><b>Institution:</b> {account?.institution}</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography><b>Account balance:</b> {account?.balance}</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography><b>Last credit:</b> ${lastCreditAmount}</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography><b>Last credit date:</b> {lastCreditDate}</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography><b>Last debit:</b> ${lastDebitAmount}</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography><b>Last debit date:</b> {lastDebitDate}</Typography>
                    </Grid>
                </Grid>
                {/* <NewEntry accountId={accountId}/> */}
            </Container>
            <Container>
                <Typography variant='h4'>Recent activity</Typography>
                {entries.map((entry:any)=>{
                    return (
                        <Typography>{entry.creditDebit} | {new Date(entry.start).toDateString()} - {entry.title} - ${entry.amount}</Typography>
                        )
                })}
            </Container>
        </Box>
    );
};

export default SingleAccount;
