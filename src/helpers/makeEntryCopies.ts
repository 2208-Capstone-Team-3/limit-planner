import { addDays, addMonths } from "date-fns";
import { EntryAttributes } from "../../server/db/models/Entry.model";
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";

export interface SkipDateAttributes
  extends Model<
    InferAttributes<SkipDateAttributes>,
    InferCreationAttributes<SkipDateAttributes>
  > {
id?: string;
skippeddate: Date;
createdAt?: string,
updatedAt?: string,
entryId?: string,
accountId?: string,
userId?: string,
}

const makeEntryCopies = async (entryData: EntryAttributes[], skipdates: SkipDateAttributes[] = [], duration?: number) => {
    // const token = window.localStorage.getItem("token");
    
    //   console.log("SKIPDATES!!",skipdates)
  let newEntries: EntryAttributes[] = [];

  await entryData.forEach((entry: EntryAttributes) => {
    let newDate = new Date(entry.start)
    // console.log("ENTRY.START DATE:", entry.start)
    //ENTRY.START IS this format 2023-02-11T00:00:00.000Z

    const filtered = skipdates.filter((date: SkipDateAttributes)=> {
        return date.entryId === entry.id
    })
    const mapped = filtered?.map((date: SkipDateAttributes)=> {
        // console.log("INSIDE MAPPED",date.skippeddate)
        return date.skippeddate
    })
    // const grabDatesOnly = mapped?.map((date)=> {
    //     console.log("INSIDE GRABDATESONLY", date)
    //     return date
        // 2023-02-11T00:00:00.000Z looks like this with no modifiers
        // [2023-02-11T00:00:00.000Z]
        // setHours(0,0,0,0)
    // })
    // console.log("GRABBEDDATES ONLY: ",grabDatesOnly)

    if (entry.frequency === "Monthly") {
      for (let i = 0; i <= 12; i++) {
        if (mapped?.includes(new Date(entry.start))) {
            newDate = addMonths(newDate, 1)
        } else {
        let newEntry = structuredClone(entry);
        // console.log("BEFORE TURNED INTO ISO: ",newEntry.start)
        newEntry.start = newDate.toISOString();
        // console.log("AFTER TURNED INTO ISO", newEntry.start)
        
        newEntries = [...newEntries, newEntry];
        newDate = addMonths(newDate, 1);
        }
      }
    }
    if (entry.frequency === "Bi-Weekly") {
      for (let i = 0; i <= 26; i++) {
        if (mapped?.includes(new Date(entry.start))) {
            newDate = addDays(newDate, 14)
        } else {
        let newEntry = structuredClone(entry);
        newEntry.start = newDate.toISOString();
        newEntries = [...newEntries, newEntry];
        newDate = addDays(newDate, 14);
      }
    }
    }
    if (entry.frequency === "Weekly") {
      for (let i = 0; i <= 52; i++) {
        if (mapped?.includes(new Date(entry.start))) {
            newDate = addDays(newDate, 7)
        } else {
        let newEntry = structuredClone(entry);
        newEntry.start = newDate.toISOString();
        newEntries = [...newEntries, newEntry];
        newDate = addDays(newDate, 7);
      }
    }
    }
    if (entry.frequency === "ByDate") {
      let newEntry = structuredClone(entry);
      newEntries = [...newEntries, newEntry];
    }
  });
  console.log("finished copying entries")
  return newEntries;
};

export default makeEntryCopies;
