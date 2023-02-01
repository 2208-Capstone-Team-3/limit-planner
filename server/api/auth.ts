import express, { NextFunction, Request, Response } from "express";

import { User } from "../db/index.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.sendStatus(404);

    const foundUser = await User.prototype.findByToken(token);
    
    res.status(200).send(foundUser);
  } catch (error) {
    res.status(404).send("Failed to Find User By Token");
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await User.prototype.authenticate(req.body));
  } catch (error) {
    next(error);
  }
});

router.use("/testAuth", authenticateUser);

router.get("/testAuth", (req: Request, res: Response, next) => {
  if (res.locals.user.isAdmin === false) return res.sendStatus(404);
  const userInfo = res.locals.user;
  res.status(200).send(userInfo);
});

export default router;
