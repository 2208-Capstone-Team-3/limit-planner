import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NewEntry from "../Entry/NewEntry";
import NewGoal from "../Goals/NewGoal";
import { RootState } from "../../store";
import { EntryAttributes } from "../../../server/db/models/Entry.model";
import { AccountAttributes } from "../../../server/db/models/Account.model";
// MUI Components
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const SingleAccount = () => {
  const { accountId } = useParams();
  const reoccurEntries = useSelector(
    (state: RootState) => state.reoccurEntries.reoccurEntries
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountAttributes | null>(null);
  const [entries, setEntries] = useState<EntryAttributes[] | []>([]);
  const [lastCreditDate, setLastCreditDate] = useState<string>("");
  const [lastCreditAmount, setLastCreditAmount] = useState<number>(0);
  const [lastDebitDate, setLastDebitDate] = useState<string>("");
  const [lastDebitAmount, setLastDebitAmount] = useState<number>(0);

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    const token = window.localStorage.getItem("token");
    if (token) {
      const account = await axios.get(`/api/accounts/${accountId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (account) setAccount(account.data);
      setLoading(false);
    }
  }, [accountId]);

  /** sorting entries and find recent activity */
  const findRecentEntries = useCallback(() => {
    setLoading(true);
    let recentEntries = [...reoccurEntries];
    recentEntries = recentEntries.filter((entry) => {
      const diff = new Date().getTime() - new Date(entry.start).getTime();
      if (entry.accountId === accountId && diff >= 0) return entry;
    });
    recentEntries.sort((a, b) => {
      return new Date(b.start).getTime() - new Date(a.start).getTime();
    });
    setEntries(recentEntries);
    const lastCreditEntry = recentEntries.find(
      (entry) => entry.creditDebit === "Credit"
    );
    if (lastCreditEntry) {
      setLastCreditDate(new Date(lastCreditEntry.start).toDateString());
      setLastCreditAmount(lastCreditEntry.amount);
    }
    const lastDebitEntry = recentEntries.find(
      (entry) => entry.creditDebit === "Debit"
    );
    if (lastDebitEntry) {
      setLastDebitDate(new Date(lastDebitEntry.start).toDateString());
      setLastDebitAmount(lastDebitEntry.amount);
    }
    setLoading(false);
  }, [accountId, reoccurEntries]);

  useEffect(() => {
    fetchAccount();
    findRecentEntries();
  }, [fetchAccount, findRecentEntries]);

  if (loading) return <CircularProgress />;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <Grid2 container>
        <Grid2 xs={5} padding={1}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
              placeContent: "center",
            }}
          >
            <Grid2
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 3 }}
            >
              <Grid2 xs={4}>
                <Typography>
                  <b>Account type:</b> {account?.accountType}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography>
                  <b>Institution:</b> {account?.institution}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography>
                  <b>Account balance:</b> {account?.balance}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography>
                  <b>Last credit:</b> ${lastCreditAmount}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography>
                  <b>Last credit date:</b> {lastCreditDate}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography>
                  <b>Last debit:</b> ${lastDebitAmount}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography>
                  <b>Last debit date:</b> {lastDebitDate}
                </Typography>
              </Grid2>
            </Grid2>
          </Container>
          <Divider variant="middle" />
          <Container>
            <Typography variant="h4">Recent activity</Typography>
            {entries.map((entry: any) => {
              return (
                entry.creditDebit==='Credit' ? 
                <Typography>
                  + {new Date(entry.start).toDateString()} - {entry.title} - ${entry.amount}
                  </Typography> : 
                <Typography>
                  - {new Date(entry.start).toDateString()} - {entry.title} - ${entry.amount}
                </Typography>
              );
            })}
          </Container>
        </Grid2>
        <Grid2 xs={7}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              placeItems: "center",
            }}
          >
            <Typography variant="h2">{account?.accountName}</Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                placeItems: "center",
              }}
            >
              <Typography variant="h3">New Entry</Typography>
              <NewEntry accountId={accountId} />
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                placeItems: "center",
              }}
            >
              <Typography variant="h3">New Goal</Typography>
              <NewGoal accountId={accountId} />
            </Container>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SingleAccount;
