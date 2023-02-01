import express, { Request, Response, NextFunction } from "express";
import { Entry, User } from "../db/index.js";
import { EntryAttributes } from "../db/models/Entry.model.js";
import { UserAttributes } from "../db/models/User.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.sendStatus(404);

    const foundUser = await User.prototype.findByToken(token);

    const foundUserInfo: UserAttributes | null = await User.findByPk(
      foundUser.id,
      {
        include: [Entry],
      }
    );
    if (foundUserInfo) {
      const entryInfoOnly = foundUserInfo.accounts;
      res.status(200).send(entryInfoOnly);
    }
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