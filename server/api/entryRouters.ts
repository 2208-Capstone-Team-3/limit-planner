import express, { Request, Response, NextFunction } from "express";
import { Account, Entry } from "../db/index.js";
import { EntryAttributes } from "../db/models/Entry.model.js";
import { entryReqBody } from "../../src/Components/Entry/Entry.js"
const router = express.Router();

//get entries
router.get("/", async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
  try {
    const entries: EntryAttributes[] = await Entry.findAll();
    res.send(entries);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

//post new entry
router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {

  try {
      const {accountId, entryType, date, creditDebit, amount, title, note, frequency} : entryReqBody = req.body
   
      const newEntry = await Entry.create({
        entryType, date, creditDebit, amount, title, note, frequency
      })
      const account = await Account.findByPk(accountId)
      account.addEntry(newEntry);
  
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });


  //update an entry
  router.put("/:entryId", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {

    try {
      const { 
        entryType,
      date,
      creditDebit,
      amount,
      title,
      note,
      frequency} = req.body
      const entryId: string = req.params.entryId

      
      
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });
  

  //delete an entry
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
  

export default router;