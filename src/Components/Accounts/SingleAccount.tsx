import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewEntry from "../Entry/NewEntry";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const SingleAccount = () => {
  const { accountId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<any>({});

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`/api/accounts/${accountId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setAccount(response.data);
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  if (loading) return <CircularProgress />;
  return (
    <Box>
      <Container sx={{display: "flex", flexDirection: "column", placeItems: "center", placeContent: "center"}}>
        <Typography variant="h2">{account.accountName}</Typography>
        <NewEntry accountId={accountId} />
      </Container>
    </Box>
  );
};

export default SingleAccount;
