import express, { Request, Response, NextFunction } from "express";
import { Goal, User } from "../db/index.js";
import { GoalAttributes } from "../db/models/Goal.model.js";
import { UserAttributes } from "../db/models/User.model.js";
// import { UserAttributes } from "../db/models/User.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

// interface UserAccounts extends UserAttributes {
//   Goal: GoalAttributes;
// }

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.sendStatus(404);

    const foundUser = await User.prototype.findByToken(token);

    const foundUserInfo: UserAttributes | null = await User.findByPk(
      foundUser.id,
      {
        include: [Goal],
      }
    );
    if (foundUserInfo) {
      const goalInfoOnly = foundUserInfo.accounts;
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
      const {
        name,
        goalAmount,
        startAmount,
        startDate,
        endDate,
        victory,
      }: GoalAttributes = req.body;
      // const createGoal=
      await Goal.create({
        name,
        goalAmount,
        startAmount,
        startDate,
        endDate,
        victory,
      });
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
