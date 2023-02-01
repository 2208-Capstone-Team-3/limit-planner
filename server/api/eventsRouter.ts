import express, { Request, Response, NextFunction } from "express";
import { Event } from "../db/index.js";
import { EventAttributes } from "../db/models/Event.model.js";
import {addDays, addMonths, addYears, endOfDay} from 'date-fns'
const router = express.Router();


router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const events: EventAttributes[] = await Event.findAll();
    res.send(events);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const {  title,
      note,
      start,
      allDay,
      frequency} = req.body

      if (frequency === "ByDate"){
        await Event.create({
          title, note, start, allDay, frequency
        })
       
       } else if (frequency === "Monthly"){

        for (let i = 0; i <= 12; i++){
          await Event.create({
            title, note, start, allDay, frequency
          })

          addMonths(start, 1)

        }
        

       } 
      
      else {
        let freq = 0
        let end = 0
     

        if (frequency === "Weekly"){
          freq = 7
          end = 52
        }
        if (frequency === "BiWeekly"){
          freq = 14
          end = 26
        }
    


        for (let i = 0; i <= end; i+= freq){
          await Event.create({
            title, note, start, allDay, frequency
          })

          addDays(start, freq)

        }

      }
      res.sendStatus(204)
    
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

export default router;
