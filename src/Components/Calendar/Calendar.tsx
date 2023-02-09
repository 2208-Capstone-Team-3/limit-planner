import React, { BaseSyntheticEvent,useState} from "react";
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { Box, Modal } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { RootState } from "../../store";
import { setDateSelector } from "../../store/themeSlice";
import { setReoccurEntries } from "../../store/reoccurEntriesSlice";
import { EntryAttributes } from "../../../server/db/models/Entry.model";
import {addDays, addMonths} from 'date-fns';

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

  const [id,setId] = useState<string>("");
  const [entryType,setEntryType] = useState<string>("");
  const [amount,setAmount] = useState<number>(0);
  const [creditDebit,setCreditDebit] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [start, setStart] = useState<any>(""); // should fix this with more appropriate data type
  const [frequency, setFrequency] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);
  
  const reoccurEntries = useSelector((state:RootState) => state.reoccurEntries.reoccurEntries);
  
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
    dispatch(setDateSelector(selected.startStr))
  };

  const handleEntryTypeChange = (event:BaseSyntheticEvent) =>{
    setEntryType(event.target.value);
  };

  const handleAmountChange = (event:BaseSyntheticEvent) =>{
    setAmount(event.target.value);
  };

  const handleCreditDebitChange = (event:BaseSyntheticEvent) =>{
    setCreditDebit(event.target.value);
  };

  const handleTitleChange = (event:BaseSyntheticEvent) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event:BaseSyntheticEvent) => {
    setNote(event.target.value);
  };

  const handleStartChange = (event:BaseSyntheticEvent) =>{
    setStart(event.target.value);
  };

  const updateEntry = async() =>{
    const body = {
      entryType,
      amount,
      creditDebit,
      title,
      note,
      start,
      frequency
    };
    await axios.put(`/api/entries/${id}`,body,{
      headers: { Authorization: "Bearer " + token }
    });
    const newEntriesUpdate = await axios.get("/api/entries", {
      headers: { Authorization: "Bearer " + token }
    })
    let newEntries: EntryAttributes[] = [];
      newEntriesUpdate.data[0].forEach((entry: EntryAttributes) => {
        let newDate = new Date(entry.start);
        if (entry.frequency === "Monthly") {
          for (let i = 0; i <= 12; i++) {
            let newEntry = structuredClone(entry);
            newEntry.start = newDate.toISOString();
            newEntries = [...newEntries,newEntry];
            newDate = addMonths(newDate,1);
          };
        };
        if (entry.frequency === "Bi-Weekly") {
          for (let i = 0; i <= 26; i++) {
            let newEntry = structuredClone(entry);
            newEntry.start = newDate.toISOString();
            newEntries = [...newEntries,newEntry];
            newDate = addDays(newDate,14);
          };
        };
        if (entry.frequency === "Weekly") {
          for (let i = 0; i <= 52; i++) {
            let newEntry = structuredClone(entry);
            newEntry.start = newDate.toISOString();
            newEntries = [...newEntries,newEntry];
            newDate = addDays(newDate,7);
          };
        };
        if (entry.frequency === "ByDate") {
          let newEntry = structuredClone(entry);
          newEntries = [...newEntries,newEntry];
        };
      });
      dispatch(setReoccurEntries(newEntries));
    handleModalClose()
  };

 
  if (reoccurEntries.length===0) return <p>Loading...</p>;

  return (
    <Box>
      <Box>
        <FullCalendar
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
            <input name="entry type" value={entryType} onChange={handleEntryTypeChange}/>
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input name="amount" value={amount} onChange={handleAmountChange}/>
          </div>
          <label htmlFor="credit/debit">Credit/Debit:</label>
          <input name="credit/debit" value={creditDebit} onChange={handleCreditDebitChange}/>
          <div>
            <label htmlFor="title">Tile:</label>
            <input name="title" value={title} onChange={handleTitleChange}/>
          </div>
          <div>
            <label htmlFor="note">Note:</label>
            <input name="note" value={note} onChange={handleNoteChange}/>
          </div>
          <div>
            <label htmlFor="start date">Start date:</label>
            <input name="start date" value={start} onChange={handleStartChange}/>
          </div>
          <button onClick={updateEntry}>Update</button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
