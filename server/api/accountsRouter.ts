import express, { Request, Response, NextFunction } from "express";
import { Account, User } from "../db/index.js";
import { AccountAttributes } from "../db/models/Account.model.js";
import { UserAttributes } from "../db/models/User.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

// GET  /api/accounts
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.sendStatus(404);

    const foundUser: UserAttributes = await User.prototype.findByToken(token);

    const foundUserInfo: UserAttributes | null = await User.findByPk(
      foundUser.id,
      {
        include: [Account],
      }
    );
    if (foundUserInfo) {
      const accountInfoOnly = foundUserInfo.accounts;
      res.status(200).send(accountInfoOnly);
    }
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// GET  /api/accounts/:accountId
router.get(
  "/accounts/:accountId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // if (real user) {
      const accountId: string = req.params.accountId;
      const foundAccount = await Account.findByPk(accountId);
      res.send(foundAccount);
      // }  otherwise throw error
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

// POST  /api/accounts
router.post(
  "/",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        accountType,
        accountName,
        institution,
        balance,
      }: AccountAttributes = req.body;
      // const createAccount =
      await Account.create({
        accountType,
        accountName,
        institution,
        balance,
      });
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

// DELETE  /api/:accountId
router.delete(
  "/:accountId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountId: string = req.params.accountId;
      //soimething weird happens since
      //accountId starts string but ends up number??
      //so TS forces it to be string idk
      const accountToDelete = await Account.findByPk(accountId);
      accountToDelete?.destroy();
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

export default router;
