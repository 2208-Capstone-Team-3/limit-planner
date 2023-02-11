import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { RootState } from "../../store";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';
import { EntryAttributes } from "../../../server/db/models/Entry.model";

const SingleAccount = () => {
    const { accountId } = useParams();

    const [loading,setLoading] = useState<boolean>(false);
    const [account,setAccount] = useState<EntryAttributes | any>({});

    const fetchAccount = async() => {
        setLoading(true);
        const token = window.localStorage.getItem("token");
        if(token){
            const response = await axios.get(`/api/accounts/${accountId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setAccount(response.data);
            setLoading(false);
        };
    };

    useEffect(()=>{
        fetchAccount();
    },[]);

    if(loading) return <p>Loading...</p>
    return (
        <div>
            <h1>{account.accountName}</h1>
        </div>
    );
};

export default SingleAccount;