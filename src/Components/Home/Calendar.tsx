import React, { FC,useState, useEffect } from 'react';
import axios from 'axios';
import { EventApi, EventInput, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/core';
import { Box, List, ListItem, ListItemText, Typography, useTheme, Modal } from "@mui/material";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign:'center'
};

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const Calendar:FC=()=>{
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<EventInput[]>([]);

  const fetchGoals = async () => {
    const response = await axios.get('/api/events');
    setEvents(response.data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // const handleEvents = (events: EventApi[]) => {
  //   setEvents(events);
  // };

  const handleModalOpen = (selected: EventClickArg) => {
    setModalOpen(true);
    setDate(`${selected.event.start}`);
    setTitle(selected.event.title);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  console.log(events)
  console.log(INITIAL_EVENTS)

  return (
    <Box>
      <Box sx={{ height: 500,width: 1000 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,today,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={events}
          eventClick={handleModalOpen}
          //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
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
              </Box>
          </Modal>
    </Box>
  );
};

export default Calendar;
