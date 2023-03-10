import express, { Request, Response, NextFunction } from "express";
import { Account, Entry, User, Skipdate } from "../db/index.js";
import { AccountAttributes } from "../db/models/Account.model.js";
import { EntryAttributes } from "../db/models/Entry.model.js";
import { UserAttributes } from "../db/models/User.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";

const router = express.Router();
// TEST API
// api/entries/skipdates
router.get(
  "/skipdates",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body.user;
      if (user) {
        const foundSkip = await Skipdate.findAll({
          where: {
            userId: user.id,
          },
        });
        res.send(foundSkip);
      }
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.get(
  "/allskipdates",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allSkips = await Skipdate.findAll();
      res.send(allSkips);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.post(
  "/skipdates",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skippeddate, userId, entryId } = req.body;
      const createdSkip = await Skipdate.create({ skippeddate });
      const foundUser = await User.findByPk(userId);
      const foundEntry = await Entry.findByPk(entryId);
      foundUser?.addSkipdate(createdSkip);
      foundEntry?.addSkipdate(createdSkip);
      res.send(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
      next(err);
    }
  }
);

router.get(
  "/:entryId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundEntry: EntryAttributes | null = await Entry.findByPk(
        req.params.entryId
      );
      if (foundEntry) res.send(foundEntry);
      else res.sendStatus(404);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.get(
  "/",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundEntry: UserAttributes | null = await User.findByPk(
        req.body.user.id
      );
      if (!foundEntry) {
        res.sendStatus(404);
      } else {
        const foundUserAccounts: AccountAttributes[] | null =
          await Account.findAll({
            where: { userId: foundEntry?.id },
            include: [Entry],
          });
        if (!foundUserAccounts) {
          res.sendStatus(404);
        } else {
          const userEntries = foundUserAccounts.flatMap((acc) => acc.entries);
          res.send(userEntries);
        }
      }
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.post(
  "/",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const account: AccountAttributes | null = await Account.findByPk(
        req.body.accountId
      );
      if (!account) {
        res.sendStatus(404);
      } else {
        const {
          entryType,
          amount,
          creditDebit,
          title,
          note,
          start,
          allDay,
          frequency,
        }: EntryAttributes = req.body;
        const createdEntry = await Entry.create({
          entryType,
          amount,
          creditDebit,
          title,
          note,
          start,
          allDay,
          frequency,
        });
        account.addEntry(createdEntry);
        res.sendStatus(204);
      }
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.put(
  "/:entryId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foundEntry: EntryAttributes | null = await Entry.findByPk(
        req.params.entryId
      );
      if (!foundEntry) {
        res.sendStatus(404);
      } else {
        const {
          entryType,
          start,
          creditDebit,
          amount,
          title,
          note,
          allDay,
          frequency,
        }: EntryAttributes = req.body;
        foundEntry.update({
          entryType,
          start,
          creditDebit,
          amount,
          title,
          note,
          allDay,
          frequency,
        });
        res.sendStatus(204);
      }
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.delete(
  "/:entryId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entryToDelete: EntryAttributes | null = await Entry.findByPk(
        req.params.entryId
      );
      if (!entryToDelete) {
        res.sendStatus(404);
      } else {
        entryToDelete?.destroy();
        res.sendStatus(204);
      }
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

export default router;
