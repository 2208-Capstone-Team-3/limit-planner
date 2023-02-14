import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import NewEntry from "../Entry/NewEntry";
import { RootState } from "../../store";
import {EntryAttributes} from '../../../server/db/models/Entry.model';
import {AccountAttributes} from '../../../server/db/models/Account.model';
import sortEntries from '../../helpers/sortEntries';

const SingleAccount = () => {
    const { accountId } = useParams();
    const reoccurEntries = useSelector((state:RootState) => state.reoccurEntries.reoccurEntries);
    const [loading,setLoading] = useState<boolean>(false);
    const [account,setAccount] = useState<any>({});
    const [entries,setEntries] = useState<EntryAttributes[]>([]);
    const [lastCredit,setLastCredit] = useState<any>({});
    const [lastDebit,setLastDebit] = useState<any>({});

    const fetchAccount = async() => {
        setLoading(true);
        const token = window.localStorage.getItem("token");
        if(token){
            const account = await axios.get(`/api/accounts/${accountId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setAccount(account.data);
            const allEntries = await axios.get(`/api/entries`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const sortedEntries = sortEntries(allEntries.data);
            setEntries(sortedEntries);
            const credit = sortedEntries.find(entry=>entry.creditDebit==='Credit');
            setLastCredit(credit);
            const debit = sortedEntries.find(entry=>entry.creditDebit==='Debit');
            setLastDebit(debit);
            setLoading(false);
        };
    };

    
    useEffect(()=>{
        fetchAccount();
    },[]);

    console.log(reoccurEntries);

    if(loading) return <p>Loading...</p>
    return (
        <div>
            <h1>{account.accountName}</h1>
            <p>Account type: {account.accountType}</p>
            <p>Institution: {account.institution}</p>
            <p>Account balance: {account.balance}</p>
            <p>Last credit: ${lastCredit.amount} - {lastCredit.title}</p>
            <p>Last credit date: {lastCredit.start}</p>
            <p>Last debit: ${lastDebit.amount} - {lastDebit.title}</p>
            <p>Last debit date: {lastDebit.start}</p>
            <NewEntry accountId={accountId}/>
            <h2>Recent activity</h2>
            {entries.map((entry:any)=>{
                return (
                    <p>{entry.start} - {entry.title} - ${entry.amount}</p>
                    )
            })}
        </div>
    );
};

export default SingleAccount;