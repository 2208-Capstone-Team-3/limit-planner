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

export default router;
