import express, { Request, Response, NextFunction } from "express";
import { Event,RecurringEvent } from "../db/index.js";
import { EventAttributes } from "../db/models/Event.model.js";
import { RecurringEventAttributes } from "../db/models/RecurringEvent.model.js";
const router = express.Router();


router.get("/one-time", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const oneTimeEvents: EventAttributes[] = await Event.findAll();
    res.send(oneTimeEvents);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.get("/recurring", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const recurringEvents: RecurringEventAttributes[] = await RecurringEvent.findAll();
    res.send(recurringEvents);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

export default router;
