import {addDays, addMonths} from 'date-fns';
import { EntryAttributes } from '../../server/db/models/Entry.model';

const makeEntryCopies = (entryData:EntryAttributes[], skipDate?: Date[], duration?: string) => {
    let newEntries: EntryAttributes[] = [];
    entryData.forEach((entry: EntryAttributes) => {
        let newDate = new Date(entry.start);
        if (entry.frequency === "Monthly") {
          //for (let i=0; i<duration;i++) more accessibility/selectivity for duration. so we are not hardcapped at 1 years
            for (let i = 0; i <= 12; i++) {
                // check if entry[i].skip matches skipdate we provide. if it includes skipdate we want then dont copy it
                // if (!entry[i].skip === skipDate)
                // put in jan 1st -> feb 1st(SKIPDATE)
                // put in feb 1st -> march 1st 
                if (skipDate?.includes(newDate)) {
                    newDate = addMonths(newDate, 1)
                } else {
                    let newEntry = structuredClone(entry);
                    newEntry.start = newDate.toISOString(); 
                    newEntries = [...newEntries,newEntry]; 
                    newDate = addMonths(newDate,1);
                        }
            };
        };
        if (entry.frequency === "Bi-Weekly") {
            for (let i = 0; i <= 26; i++) {
                if (skipDate?.includes(newDate)) {
                    newDate = addDays(newDate, 1)
                } else {
            let newEntry = structuredClone(entry);
            newEntry.start = newDate.toISOString();
            newEntries = [...newEntries,newEntry];
            newDate = addDays(newDate,14);
            }
            };
        };
        if (entry.frequency === "Weekly") {
            for (let i = 0; i <= 52; i++) {
                if (skipDate?.includes(newDate)) {
                    newDate = addDays(newDate, 1)
                } else {
            let newEntry = structuredClone(entry);
            newEntry.start = newDate.toISOString();
            newEntries = [...newEntries,newEntry];
            newDate = addDays(newDate,7);
            };
        }
        };
        if (entry.frequency === "ByDate") {
            let newEntry = structuredClone(entry);
            newEntries = [...newEntries,newEntry];
        };
    });
    return newEntries;
};

export default makeEntryCopies;
