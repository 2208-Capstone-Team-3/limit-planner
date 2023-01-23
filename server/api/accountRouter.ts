import express, { Request, Response, NextFunction } from "express";
import { Account } from "../db/index.js";
import { AccountAttributes } from "../db/models/Account.model.js";
const router = express.Router();


router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts: AccountAttributes[] = await Account.findAll();
    res.send(accounts);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {accountType, accountName, institution, balance} : AccountAttributes = req.body
    // const createAccount = 
    await Account.create({
      accountType,
      accountName,
      institution, 
      balance
    })
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.delete("/:accountId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accountId: string = req.params.accountId
    //soimething weird happens since 
    //accountId starts string but ends up number??
    //so TS forces it to be string idk
    const accountToDelete = await Account.findByPk(accountId)
    accountToDelete?.destroy()
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

export default router;
