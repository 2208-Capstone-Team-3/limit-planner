import express, { Request, Response, NextFunction } from "express";
import { Account, Goal, User } from "../db/index.js";
import { AccountAttributes } from "../db/models/Account.model.js";
import { GoalAttributes } from "../db/models/Goal.model.js";
import { UserAttributes } from "../db/models/User.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.sendStatus(404);

    const foundUser: UserAttributes = await User.prototype.findByToken(token);
    if (!foundUser.id) {
      return res.sendStatus(404);
    }

    const foundUserInfo: AccountAttributes[] | null = await Account.findAll({
      where: { userId: foundUser.id },
      include: [Goal],
    });

    if (foundUserInfo) {
      const goalInfoOnly = foundUserInfo.map((acc) => acc.goals);
      res.status(200).send(goalInfoOnly);
    }
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post(
  "/",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body.user;
      const {
        name,
        goalAmount,
  
        endDate,
        victory,
      }: GoalAttributes = req.body;
      const createdGoal = await Goal.create({
        name,
        goalAmount,
   
        endDate,
        victory,
      });
      user.addGoal(createdGoal);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

router.delete(
  "/:GoalId",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const GoalId: string = req.params.GoalId;
      //soimething weird happens since
      //GoalId starts string but ends up number??
      //so TS forces it to be string idk
      const GoalToDelete = await Goal.findByPk(GoalId);
      GoalToDelete?.destroy();
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

export default router;
