import express, { Request, Response, NextFunction } from "express";
import { Entry, User } from "../db/index.js";
import { EntryAttributes } from "../db/models/Entry.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get("/", authenticateUser, async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
  try {
    const userId = res.locals.user.id
    const foundUserInfo = await User.findByPk(userId, {
      include: [Entry]
    })
    const entryInfoOnly = foundUserInfo.Entry
    res.send(entryInfoOnly)
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", authenticateUser, async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
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
  
  router.delete("/:entryId", authenticateUser, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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