import React, { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import "./calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Skeleton, useTheme } from "@mui/material";
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
import { setSkipdates } from "../../store/skipdatesSlice";
import makeEntryCopies from "./../../helpers/makeEntryCopies";
import { EntryAttributes } from "../../../server/db/models/Entry.model";
import { SkipDateAttributes } from "./../../helpers/makeEntryCopies";
import { blueGrey, deepOrange } from "@mui/material/colors";

// import { update } from "lodash";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Calendar = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const themey = useTheme();
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
  const theme = useSelector((state: RootState) => state.theme)
  const skipdates = useSelector(
    (state: RootState) => state.skipdates.skipdates
  );

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

  const handleEntryTypeChange = (event: BaseSyntheticEvent) => {
    setEntryType(event.target.value);
  };

  const handleAmountChange = (event: BaseSyntheticEvent) => {
    setAmount(event.target.value);
  };

  const handleCreditDebitChange = (event: BaseSyntheticEvent) => {
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
    console.log("entryId: ",id)
    console.log("userId: ", user.id)
    console.log("user object: ",user)
  }

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
    const updatedEntryCopies = await makeEntryCopies(updatedEntries.data, skipdates);
    dispatch(setEntries(updatedEntryCopies));
    dispatch(setReoccurEntries(updatedEntryCopies));
    handleModalClose();
  };

  const deleteEntry = async (event: BaseSyntheticEvent) => {
    if (event.target.value === "all") {
      await axios.delete(`/api/entries/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const updatedEntries: {data: EntryAttributes[]} = await axios.get("/api/entries", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(setEntries(updatedEntries.data))
      const updatedEntryCopies = await makeEntryCopies(updatedEntries.data, skipdates);
      const filteredEntries = updatedEntryCopies.filter(
        (entry: EntryAttributes) => entry.id !== id
      );
      dispatch(setEntries(filteredEntries));
      dispatch(setReoccurEntries(filteredEntries));
      handleModalClose();
    } else {
        const isoStart = start.toISOString()
        const databaseStart = isoStart.substring(0,10)
        const startDate = { 
          skippeddate: databaseStart, 
          userId: user.id, 
          entryId: id }
        await axios.post("/api/entries/skipdates", startDate)
        const updatedEntries = await axios.get("/api/entries", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch(setEntries(updatedEntries.data))
        let returnedSkipdates: { data: SkipDateAttributes[] } = await axios.get("/api/entries/skipdates", {
          headers: { Authorization: "Bearer " + token },
        })
        dispatch(setSkipdates(returnedSkipdates.data))
        console.log("SKIPDATES IN CALENDAR", returnedSkipdates)
        const updatedEntryCopies = await makeEntryCopies(updatedEntries.data, skipdates)
        // dispatch(setEntries(updatedEntryCopies));
        dispatch(setReoccurEntries(updatedEntryCopies))
        handleModalClose()
    }
  };

  if (reoccurEntries.length === null)
    return <Skeleton animation={"wave"} variant="rectangular" />;

  return (
    <Box>
      <Box>
        <FullCalendar
          // loading={() => reoccurEntries.length === 0}
          // 
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
            themey.palette.mode === "light" ? blueGrey[400] : deepOrange[900]
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
        <Box sx={modalStyle}>
          <div>
            <label htmlFor="entry type">Entry type:</label>
            <input
              name="entry type"
              value={entryType}
              onChange={handleEntryTypeChange}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input name="amount" value={amount} onChange={handleAmountChange} />
          </div>
          <label htmlFor="credit/debit">Credit/Debit:</label>
          <input
            name="credit/debit"
            value={creditDebit}
            onChange={handleCreditDebitChange}
          />
          <div>
            <label htmlFor="title">Tile:</label>
            <input name="title" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label htmlFor="note">Note:</label>
            <input name="note" value={note} onChange={handleNoteChange} />
          </div>
          <div>
            <label htmlFor="start date">Start date:</label>
            <input
              name="start date"
              value={start}
              onChange={handleStartChange}
            />
          </div>
          <button onClick={updateEntry}>Update</button>
          <button onClick={deleteEntry} value="all">
            Delete All  
          </button>
          <button onClick={deleteEntry} value="single">
            Delete Single
          </button>
          <button onClick={showUserInfo}>Show userinfo button</button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
