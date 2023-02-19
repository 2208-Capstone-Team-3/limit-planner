import React, { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import "./calendar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { RootState } from "../../store";
import { setDateSelector } from "../../store/themeSlice";
import { setReoccurEntries } from "../../store/reoccurEntriesSlice";
import { setEntries } from "../../store/entriesSlice";
import makeEntryCopies from "./../../helpers/makeEntryCopies";
import { EntryAttributes } from "../../../server/db/models/Entry.model";
import { SkipDateAttributes } from "./../../helpers/makeEntryCopies";
import { blueGrey, deepOrange } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import { update } from "lodash";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "Primary",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Calendar = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const theme = useTheme();
  const [id, setId] = useState<string>("");
  const [entryType, setEntryType] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [creditDebit, setCreditDebit] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [start, setStart] = useState<any>(""); // should fix this with more appropriate data type
  const [frequency, setFrequency] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);

  const reoccurEntries = useSelector(
    (state: RootState) => state.reoccurEntries.reoccurEntries
  );
  const user = useSelector((state: RootState) => state.user.user);

  const handleModalOpen = (selected: EventClickArg) => {
    setModalOpen(true);
    setId(selected.event.id);
    setEntryType(selected.event.extendedProps.entryType);
    setAmount(selected.event.extendedProps.amount);
    setCreditDebit(selected.event.extendedProps.creditDebit);
    setTitle(selected.event.title);
    setNote(selected.event.extendedProps.note);
    setStart(selected.event.start);
    setFrequency(selected.event.extendedProps.frequency);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSelect = (selected: DateSelectArg) => {
    dispatch(setDateSelector(selected.endStr));
  };

  const handleEntryTypeChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value);
  };

  const handleAmountChange = (event: BaseSyntheticEvent) => {
    setAmount(event.target.value);
  };

  const handleCreditDebitChange = (event: SelectChangeEvent) => {
    setCreditDebit(event.target.value);
  };

  const handleTitleChange = (event: BaseSyntheticEvent) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event: BaseSyntheticEvent) => {
    setNote(event.target.value);
  };

  const handleStartChange = (event: BaseSyntheticEvent) => {
    setStart(event.target.value);
  };
  const showUserInfo = () => {
    console.log("entryId: ", id);
    console.log("userId: ", user.id);
    console.log("user object: ", user);
  };

  const updateEntry = async () => {
    const body = {
      entryType,
      amount,
      creditDebit,
      title,
      note,
      start,
      frequency,
    };
    await axios.put(`/api/entries/${id}`, body, {
      headers: { Authorization: "Bearer " + token },
    });
    const updatedEntries = await axios.get("/api/entries", {
      headers: { Authorization: "Bearer " + token },
    });
    const updatedEntryCopies = await makeEntryCopies(updatedEntries.data);
    dispatch(setEntries(updatedEntryCopies));
    dispatch(setReoccurEntries(updatedEntryCopies));
    handleModalClose();
  };

  const deleteEntry = async (event: BaseSyntheticEvent) => {
    if (event.target.value === "all") {
      await axios.delete(`/api/entries/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const updatedEntries: { data: EntryAttributes[] } = await axios.get(
        "/api/entries",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const updatedEntryCopies = await makeEntryCopies(updatedEntries.data);
      const filteredEntries = updatedEntryCopies.filter(
        (entry: EntryAttributes) => entry.id !== id
      );
      dispatch(setEntries(filteredEntries));
      dispatch(setReoccurEntries(filteredEntries));
      handleModalClose();
    } else {
      console.log("single button is clicked");
      console.log("BEFORE ISOSTART START: ", start);
      const isoStart = start.toISOString();
      console.log("AFTER ISOSTRING: ", isoStart);
      const databaseStart = isoStart.substring(0, 10);
      console.log("AFTER DATABASESTART CONVER: ", databaseStart);
      const startDate = {
        skippeddate: databaseStart,
        userId: user.id,
        entryId: id,
      };
      console.log("startDate: ", startDate);
      await axios.post("/api/entries/skipdates", startDate);
      const updatedEntries = await axios.get("/api/entries", {
        headers: { Authorization: "Bearer " + token },
      });
      //grab skipdates GET
      let skipdates: { data: SkipDateAttributes[] } = await axios.get(
        "/api/entries/skipdates",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log("SKIPDATES IN CALENDAR", skipdates);
      const updatedEntryCopies = await makeEntryCopies(
        updatedEntries.data,
        skipdates.data
      );
      dispatch(setEntries(updatedEntryCopies));
      dispatch(setReoccurEntries(updatedEntryCopies));
      handleModalClose();
    }
  };

  if (reoccurEntries.length === 0)
    return <Skeleton animation={"wave"} variant="rectangular" />;

  return (
    <Box>
      <Box>
        <FullCalendar
          loading={() => reoccurEntries.length === 0}
          key={"Calendar"}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={reoccurEntries}
          events={reoccurEntries}
          select={handleSelect}
          eventClick={handleModalOpen}
          moreLinkHint={"More Events if Clicked"}
          eventColor={
            theme.palette.mode === "light" ? blueGrey[400] : deepOrange[900]
          }
          eventTextColor="white"
        />
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={modalStyle}>
          <Grid2 container spacing={1}>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <FormLabel>Entry type:</FormLabel>
                <Select
                  name="entry type"
                  value={entryType}
                  renderValue={(ele) => <Typography>{ele}</Typography>}
                  onChange={handleEntryTypeChange}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"API"}>API</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <FormLabel>Amount:</FormLabel>
                <TextField
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </FormControl>
            </Grid2>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="credit/debit">Credit/Debit:</FormLabel>
                <Select
                  name="credit/debit"
                  value={creditDebit}
                  renderValue={(ele) => <Typography>{ele}</Typography>}
                  onChange={handleCreditDebitChange}
                >
                  <MenuItem value={"Credit"}>Credit</MenuItem>
                  <MenuItem value={"Debit"}>Debit</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={6}>
              <FormControl>
                <FormLabel htmlFor="title">Title:</FormLabel>
                <TextField
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </FormControl>
            </Grid2>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="note">Note:</FormLabel>
                <TextField
                  name="note"
                  value={note}
                  onChange={handleNoteChange}
                />
              </FormControl>
            </Grid2>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="start date">Start date:</FormLabel>
                <TextField
                  name="start date"
                  value={start}
                  onChange={handleStartChange}
                />
              </FormControl>
            </Grid2>
          </Grid2>
          <Divider sx={{mt: 1, mb: 1}}/>
          <Grid2 container spacing={1}>
            <Grid2 xs={6}>
              <Button fullWidth variant="contained" onClick={updateEntry}>
                Update
              </Button>
            </Grid2>
            <Grid2 xs={6}>
              <Button fullWidth variant="contained" onClick={deleteEntry} value="all">
                Delete All
              </Button>
            </Grid2>
            <Grid2 xs={6}>
              <Button fullWidth variant="contained" onClick={deleteEntry} value="single">
                Delete Single
              </Button>
            </Grid2>
            <Grid2 xs={6}>
              <Button fullWidth variant="contained" onClick={showUserInfo}>
                Show userinfo
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      </Modal>
    </Box>
  );
};

export default Calendar;
