import React, { useState, useEffect, useCallback } from "react";
//import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Typography, Modal } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import {addDays, addMonths, addYears, endOfDay, endOfYesterday, parseISO} from 'date-fns';
//import { CommentsDisabledOutlined } from "@mui/icons-material";
//import { EventAttributes } from './../../../server/db/models/Event.model';
import { EntryAttributes } from './../../../server/db/models/Entry.model';
//import { setReoccurEntries } from "./../../store/reoccurEntriesSlice";
//import { RootState } from "../../store";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

// const months = {
//   0: "January",
//   1: "February",
//   2: "March",
//   3: "April",
//   4: "May",
//   5: "June",
//   6: "July",
//   7: "August",
//   8: "September",
//   9: "October",
//   10: "November",
//   11: "December",
// };

const Calendar = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarEntries, setCalendarEntries] = useState([] as any);
  const [loading, setLoading] = useState(false);
  //const { reoccurEntries } = useSelector((state:RootState) => state.reoccurEntries)
  //const entries = useSelector((state: RootState) => state.entries.entries);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const newEntries: EntryAttributes[] = [];
    const response = await axios.get("/api/entries");
    response.data.forEach((entry: EntryAttributes) => {
      let newDate = new Date(entry.start);
      if (entry.frequency === "Monthly") {
        for (let i = 0; i <= 12; i++) {
          let newEntry = structuredClone(entry);
          newEntry.start = newDate.toISOString();
          newEntries.push(newEntry);
          newDate = addMonths(newDate,1);
        };
      };
      if (entry.frequency === "Bi-Weekly") {
        for (let i = 0; i <= 26; i++) {
          let newEntry = structuredClone(entry);
          newEntry.start = newDate.toISOString();
          newEntries.push(newEntry);
          newDate = addDays(newDate,14);
        };
      };
      if (entry.frequency === "Weekly") {
        for (let i = 0; i <= 52; i++) {
          let newEntry = structuredClone(entry);
          newEntry.start = newDate.toISOString();
          newEntries.push(newEntry);
          newDate = addDays(newDate,7);
        };
      };
      if (entry.frequency === "ByDate") {
        for (let i = 0; i <= 365; i++) {
          let newEntry = structuredClone(entry);
          newEntry.start = newDate.toISOString();
          newEntries.push(newEntry);
          newDate = addDays(newDate,1);
        };
      };
    });
    setCalendarEntries(newEntries);
    setLoading(false);
  },[]);
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleModalOpen = (selected: EventClickArg) => {
    setModalOpen(true);
    setDate(`${selected.event.start}`);
    setTitle(selected.event.title);
    setNote(selected.event.extendedProps.note);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
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
          initialEvents={calendarEntries}
          eventClick={handleModalOpen}
          //eventsSet={(events)=>setEvents(currentEvents)} // called after events are initialized/added/changed/removed
          // eventAdd={function(){}}
          // eventChange={function(){}}
          // eventRemove={function(){}}
          //select={this.handleDateSelect}
          //eventContent={renderEventContent} // custom render function
        />
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {date}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {note}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
