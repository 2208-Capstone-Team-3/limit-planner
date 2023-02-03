import express, { Request, Response, NextFunction } from "express";
import { Event } from "../db/index.js";
import { EventAttributes } from "../db/models/Event.model.js";
const router = express.Router();


router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const oneTimeEvents: EventAttributes[] = await Event.findAll();
    res.send(oneTimeEvents);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

export default router;
