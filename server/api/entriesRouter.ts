import express, { Request, Response, NextFunction } from "express";
import { Account, Entry, User } from "../db/index.js";
import { AccountAttributes } from "../db/models/Account.model.js";
import { EntryAttributes } from "../db/models/Entry.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.sendStatus(404);

    const foundUser = await User.prototype.findByToken(token);

    if (!foundUser.id) {
      return res.sendStatus(404);
    }

    const foundUserInfo: AccountAttributes[] | null = await Account.findAll({
      where: { userId: foundUser.id },
      include: [Entry],
    });

    if (foundUserInfo) {
      const entryInfoOnly = foundUserInfo.map((acc) => acc.entries);
      res.status(200).send(entryInfoOnly);
    }
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// get for calendar
router.get("/calendar", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const events: EntryAttributes[] = await Entry.findAll();
    res.send(events);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});


// router.post(
//   "/",
//   authenticateUser,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     // const user = req.body.user;
//     const account = req.body.account;
//     try {
//       const {
//         entryType,
//         date,
//         creditDebit,
//         amount,
//         title,
//         note,
//         frequency,
//       }: EntryAttributes = req.body;
//       const createdEntry = await Entry.create({
//         entryType,
//         date,
//         creditDebit,
//         amount,
//         title,
//         note,
//         frequency,
//       });
//       account.addEntry(createdEntry);
//       res.sendStatus(204);
//     } catch (err) {
//       res.sendStatus(404);
//       next(err);
//     }
//   }
// );

router.delete(
  "/:entryId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entryId: string = req.params.entryId;
      //soimething weird happens since
      //entryId starts string but ends up number??
      //so TS forces it to be string idk
      const entryToDelete = await Entry.findByPk(entryId);
      entryToDelete?.destroy();
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

export default router;
