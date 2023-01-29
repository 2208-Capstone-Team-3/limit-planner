import express, { Request, Response, NextFunction } from "express";
import { Entry } from "../db/index.js";
import { EntryAttributes } from "../db/models/Entry.model.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
  try {
    const entries: EntryAttributes[] = await Entry.findAll();
    res.send(entries);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
      const {entryType, date, creditDebit, amount, title, note, frequency} : EntryAttributes = req.body
      // const createEntry= 
      await Entry.create({
        entryType, date, creditDebit, amount, title, note, frequency
      })
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });
  
  router.delete("/:entryId", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entryId: string = req.params.entryId
      //soimething weird happens since 
      //entryId starts string but ends up number??
      //so TS forces it to be string idk
      const entryToDelete = await Entry.findByPk(entryId)
      entryToDelete?.destroy()
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });

  router.post("/entryId", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
      const entryId = req.params
      const {entryType, date, creditDebit, amount, title, note, frequency} : EntryAttributes = req.body
      // const createEntry= 
      await Entry.create({
        entryType, date, creditDebit, amount, title, note, frequency
      })
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });
  
  

export default router;