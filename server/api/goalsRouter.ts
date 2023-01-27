import express, { Request, Response, NextFunction } from "express";
import { Goal } from "../db/index.js";
import { GoalAttributes } from "../db/models/Goal.model.js";
import { authenticateUser } from "./helpers/authUserMiddleware.js";
const router = express.Router();

router.get("/", authenticateUser, async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
  try {
    const foundUserInfo = res.locals.user
    const userGoals = foundUserInfo.Goal
    res.send(userGoals)
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", authenticateUser, async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
      const {name, goalAmount, startAmount, startDate, endDate, victory} : GoalAttributes = req.body
      // const createGoal= 
      await Goal.create({
        name, goalAmount, startAmount, startDate, endDate, victory
      })
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });
  
  router.delete("/:GoalId", authenticateUser, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const GoalId: string = req.params.GoalId
      //soimething weird happens since 
      //GoalId starts string but ends up number??
      //so TS forces it to be string idk
      const GoalToDelete = await Goal.findByPk(GoalId)
      GoalToDelete?.destroy()
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  });
  

export default router;