import {addDays, addMonths} from 'date-fns';
import { EntryAttributes } from '../../server/db/models/Entry.model';

const makeEntryCopies = (entryData:EntryAttributes[]) => {
    let newEntries: EntryAttributes[] = [];
    entryData.forEach((entry: EntryAttributes) => {
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
    console.log("cloning entries complete: ",newEntries)
    return newEntries;
};

export default makeEntryCopies;
