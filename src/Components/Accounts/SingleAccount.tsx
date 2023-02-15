import React, { useCallback,useState,useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import NewEntry from "../Entry/NewEntry";
import { RootState } from "../../store";
import {EntryAttributes} from '../../../server/db/models/Entry.model';
import {AccountAttributes} from '../../../server/db/models/Account.model';

const SingleAccount = () => {
    const { accountId } = useParams();
    const reoccurEntries = useSelector((state:RootState) => state.reoccurEntries.reoccurEntries);
    const [loading,setLoading] = useState<boolean>(false);
    const [account,setAccount] = useState<AccountAttributes | null>(null);
    const [entries,setEntries] = useState<EntryAttributes[] | []>([]);
    const [lastCredit,setLastCredit] = useState<any>({});
    const [lastDebit,setLastDebit] = useState<any>({});

    const fetchAccount = useCallback(async() => {
        setLoading(true);
        const token = window.localStorage.getItem("token");
        if(token){
            const account = await axios.get(`/api/accounts/${accountId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setAccount(account.data);
            setLoading(false);
        };
    },[accountId]);

    /** sorting entries and find recent activity */
    const fetchEntries = useCallback(() => {
        let sortedEntries = [...reoccurEntries];
        sortedEntries.sort((a, b)=>{
            return new Date(b.start).getTime() - new Date(a.start).getTime();
        });
        sortedEntries = sortedEntries.filter(entry=>{
            const diff = new Date().getTime() - new Date(entry.start).getTime();
            if(diff>=0) return entry;
        });
        setEntries(sortedEntries)
    },[reoccurEntries]);
    
    useEffect(()=>{
        fetchAccount();
        fetchEntries();
    },[fetchAccount,fetchEntries]);

    if(loading) return <p>Loading...</p>
    return (
        <div>
            <h1>{account?.accountName}</h1>
            <p>Account type: {account?.accountType}</p>
            <p>Institution: {account?.institution}</p>
            <p>Account balance: {account?.balance}</p>
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