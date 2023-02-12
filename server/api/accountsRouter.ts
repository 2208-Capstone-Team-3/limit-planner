import express, { Request, Response, NextFunction } from "express";
import { Account, User } from "../db/index.js";
import { AccountAttributes } from "../db/models/Account.model.js";
import { UserAttributes } from "../db/models/User.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get(
  "/", 
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser: UserAttributes | null = await User.findByPk(req.body.user.id);
    if(!foundUser){
      res.sendStatus(404);
    }else{
      const foundUserInfo: UserAttributes | null = await User.findByPk(foundUser.id,{
          include: [Account],
        }
      );
      if (!foundUserInfo) {
        res.sendStatus(404);
      }else{
        const accountInfoOnly = foundUserInfo.accounts;
        res.status(200).send(accountInfoOnly);
      };
    };
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.get(
  "/:accountId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foundAccount:AccountAttributes | null = await Account.findByPk(req.params.accountId);
      if(!foundAccount){
        res.sendStatus(404);
      }else{
        res.send(foundAccount);
      };
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
