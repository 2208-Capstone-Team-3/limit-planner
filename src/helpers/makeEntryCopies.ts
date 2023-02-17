import { addDays, addMonths } from "date-fns";
import express from "express";
import { EntryAttributes } from "../../server/db/models/Entry.model";
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
import Skipdate from "../../server/db/models/Skipdate.model";

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


const makeEntryCopies = (entryData: EntryAttributes[], skipDate?: SkipDateAttributes[], duration?: number) => {
  let newEntries: EntryAttributes[] = [];
  entryData.forEach((entry: EntryAttributes) => {
    let newDate = new Date(entry.start)

    const filteredSkipdates = skipDate?.filter((date) => date.entryId === entry.id)
    .map((date) => new Date(date.skippeddate))

    if (entry.frequency === "Monthly") {
      for (let i = 0; i <= 12; i++) {
        if (filteredSkipdates?.includes(new Date(entry.start))) {
            newDate = addMonths(newDate, 1)
        } else {
        let newEntry = structuredClone(entry);
        newEntry.start = newDate.toISOString();
        newEntries = [...newEntries, newEntry];
        newDate = addMonths(newDate, 1);
        }
      }
    }
    if (entry.frequency === "Bi-Weekly") {
      for (let i = 0; i <= 26; i++) {
        if (filteredSkipdates?.includes(new Date(entry.start))) {
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
        if (filteredSkipdates?.includes(new Date(entry.start))) {
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
  return newEntries;
};

export default makeEntryCopies;
