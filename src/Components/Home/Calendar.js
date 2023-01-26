import React, { useState, useEffect } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";

/**
 * Following example of FullCalendar with TypeScript
 * https://github.com/fullcalendar/fullcalendar-examples/blob/main/react-typescript/src/DemoApp.tsx
 */

const Calendar = () => {
    const [events,setEvents] = useState([]);

    const handleDateSelect = (selected) => {
        let title = prompt('Please enter a new title for your event');
        let calendarApi = selected.view.calendar
    
        calendarApi.unselect(); // clear date selection
    
        if (title) {
        
            calendarApi.addEvent({
                id: `${selected.start}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            });
        };
    };
    
    const handleEventClick = (selected) => {
    // eslint-disable-next-line no-restricted-globals
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
            selected.event.remove();
        };
    };

    return(
        <Box>
            <Box sx={{ height: 500,width: 1000 }}>
                <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin
                ]}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventsSet={(events)=>setEvents(events)}
                initialEvents={[
                    { id:'1234',title:'All day event',start:'2023-01-25' },
                    { id:'5678',title:'All day event',start:'2023-01-20' },
                ]}
                />
            </Box>
        </Box>
    ) 

};

export default Calendar;
