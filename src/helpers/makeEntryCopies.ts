import { addDays, addMonths, subDays } from "date-fns";
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
  // function dateCallBack(date: any): string{
  //   date = new Date(String(date))
  //   let year: number = date.getYear()
  //   let month: number = date.getMonth()
  //   let day: number = date.getDate()
  //   return  String(year) + String(month) + String(day)
  // }


const makeEntryCopies = async (entryData: EntryAttributes[], skipdates: SkipDateAttributes[] = [], duration?: number) => {
  let newEntries: EntryAttributes[] = [];

  entryData.forEach((entry: EntryAttributes) => {
    let newDate = new Date(entry.start)
    const filtered = skipdates.filter((date: SkipDateAttributes)=> {
        return date.entryId === entry.id
    })
    const mapped = filtered.map((date: SkipDateAttributes)=> new Date(date.skippeddate).toLocaleDateString("default")
    )
    
    if (entry.frequency === "Monthly") {
      for (let i = 0; i <= 12; i++) {
        if (mapped.includes(subDays(newDate, 1).toLocaleDateString("default"))) {
          // console.log("we got one!!!")
            newDate = addMonths(newDate, 1)
            continue
        } else {
        let newEntry = structuredClone(entry);
        // console.log("BEFORE TURNED INTO ISO: ",newEntry.start)
        newEntry.start = new Date(newDate).toISOString();
        // console.log("AFTER TURNED INTO ISO", newEntry.start)
        
        newEntries = [...newEntries, newEntry];
        newDate = addMonths(newDate, 1);
        }
      }
    }
    if (entry.frequency === "Bi-Weekly") {
      for (let i = 0; i <= 26; i++) {
        if (mapped.includes(subDays(newDate, 1).toLocaleDateString()))  {
            newDate = addDays(newDate, 14)
            continue
        } else {
        let newEntry = structuredClone(entry);
        newEntry.start = new Date(newDate).toISOString();
        newEntries.push(newEntry)
        newDate = addDays(newDate, 14);
        }
    }
    }
    if (entry.frequency === "Weekly") {
      for (let i = 0; i <= 52; i++) {
        if (mapped.includes(subDays(newDate, 1).toLocaleDateString("default")))  {
          // console.log("we got one!!!")
            newDate = addDays(newDate, 7)
            continue
        } else {
        let newEntry = structuredClone(entry);
        newEntry.start = new Date(newDate).toISOString();
        newEntries.push(newEntry)
        newDate = addDays(newDate, 7);
        }
    }
    }
    if (entry.frequency === "ByDate") {
      let newEntry = structuredClone(entry);
      newEntries.push(newEntry)
    }
  });
  // console.log("finished copying entries")
  console.log("these are the new entries ", newEntries)
  return newEntries;
  
};

export default makeEntryCopies;

// const makeEntryCopies = async (entryData: EntryAttributes[], skipdates: SkipDateAttributes[]) => {
 
//     // const token = window.localStorage.getItem("token");    
//     // console.log("SKIPDATES!!",skipdates)
//   let newEntries: EntryAttributes[] = [];
//   // if (account){
//   // entryData = await entryData.filter((ent: EntryAttributes) =>  ent.accountId === account)}

//   await entryData.forEach((entry: EntryAttributes) => {
//     let newDate = new Date(entry.start)
//     // console.log("ENTRY.START DATE:", entry.start)
//     //ENTRY.START IS this format 2023-02-11T00:00:00.000Z

//     const filtered = skipdates.filter((date: SkipDateAttributes)=> {
//         return date.entryId === entry.id
//     })
//     const mapped = filtered.map((date: SkipDateAttributes)=> {
     
//         return date.skippeddate
//     })
    
//     // let date = newDate() -> typeof date -> Date object
//     // let secondDate = date.toISOString() -> typeof secondDate -> string
//     if (entry.frequency === "Monthly") {
//       for (let i = 0; i <= 12; i++) {
//         if (mapped.includes(newDate)) {
//             newDate = addMonths(newDate, 1) 
//         } else {
//         let newEntry = structuredClone(entry);
//         // console.log("BEFORE TURNED INTO ISO: ",newEntry.start)
//         newEntry.start = new Date(newDate).toISOString();
//         // console.log("AFTER TURNED INTO ISO", newEntry.start)
        
//         newEntries = [...newEntries, newEntry];
//         newDate = addMonths(newDate, 1);
//         }
//       }
//     }
//     if (entry.frequency === "Bi-Weekly") {
//       for (let i = 0; i <= 26; i++) {
       
//         if (mapped.includes(addDays(newDate,1))) {
          
//             newDate = addDays(newDate, 14)
//         } else {
//         let newEntry = structuredClone(entry);
//         newEntry.start = new Date(newDate).toISOString();
//         newEntries = [...newEntries, newEntry];
//         newDate = addDays(newDate, 14);
//       }
//     }
//     }
//     if (entry.frequency === "Weekly") {
//       for (let i = 0; i <= 52; i++) {
        
//         if (mapped.includes(newDate)) {
//             newDate = addDays(newDate, 7)
//         } else {
//         let newEntry = structuredClone(entry);
//         newEntry.start = new Date(newDate).toISOString();
//         newEntries = [...newEntries, newEntry];
//         newDate = addDays(newDate, 7);
//       }
//     }
//     }
//     if (entry.frequency === "ByDate") {
//       let newEntry = structuredClone(entry);
//       newEntries = [...newEntries, newEntry];
//     }
//     console.log("CHECKING MAPPED",mapped[0])
//     console.log("comparison ", mapped[0], String(entry.start))
//   });
//   console.log("finished copying entries")
  
//   return newEntries;
// };

// export default makeEntryCopies;
