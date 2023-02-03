import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Modal } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import {addDays, addMonths, addYears, endOfDay} from 'date-fns';
import { CommentsDisabledOutlined } from "@mui/icons-material";
import { EventAttributes } from './../../../server/db/models/Event.model';

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

/**
 * Notes about the calendar:
 * Only working if not TS file
 * Need to have a field 'start' and optional 'end' on model NOT startDate or endDate
 * Need to have a field 'allDay' on an event
 * Properties like 'note' are placed on 'extendedProps' automatically by FullCalendar
 * We will have to refactor any models that we want to display on a calendar to
 * appease FullCalendar
 */

const Calendar = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    // creating a new empty array for events
    const newEvents:EventAttributes[]=[];
    const response = await axios.get("/api/events");
    // looping over the events from DB
    response.data.forEach((event:EventAttributes)=>{
      if(event.frequency==="Bi-Weekly"){
        // creating a copy of the event from the API response
        let newEvent=event;
        for (let i = 0; i <= 26; i++){
          // pushing the copy to the array 'newEvents'
          newEvents.push(newEvent);
          // need to add some logic for 'addDays'
        };
      }else if(event.frequency==="Monthly"){
        // creating a copy of the event from the API response
        let newEvent=event;
        for (let i = 0; i <= 12; i++){
          // pushing the copy to the array 'newEvents'
          newEvents.push(newEvent);
          // need to add some logic for 'addMonths'
        };
      };
    });
    setCalendarEvents(newEvents);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
          initialEvents={calendarEvents}
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
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {date}
          </Typography> */}
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {title}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
