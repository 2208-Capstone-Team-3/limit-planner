import {addDays, addMonths} from 'date-fns';
import { EntryAttributes } from '../../server/db/models/Entry.model';



const makeEntryCopies = (entryData:EntryAttributes[]) => {

    

    let newEntries: EntryAttributes[] = [];
    // entryData = entryData.filter((ent: EntryAttributes) => ent.accountId === theme.theme.accountSelector)
    entryData.forEach((entry: EntryAttributes) => {
        let newDate = new Date(entry.start);
        if (entry.frequency === "Monthly") {
            for (let i = 0; i <= 12; i++) {
                // check if entry[i].skip matches skipdate we provide. if it includes skipdate we want then dont copy it
                // if (!entry[i].skip === skipDate)
            let newEntry = structuredClone(entry);
            console.log("date seed info:", newEntry.start)
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
