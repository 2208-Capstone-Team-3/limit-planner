import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewEntry from "../Entry/NewEntry";

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

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>{account.accountName}</h1>
      <NewEntry accountId={accountId} />
    </div>
  );
};

export default SingleAccount;
