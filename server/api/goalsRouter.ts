import express, { Request, Response, NextFunction } from "express";
import { Goal } from "../db/index.js";
import { GoalAttributes } from "../db/models/Goal.model.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
  try {
    const goals: GoalAttributes[] = await Goal.findAll();
    res.send(goals);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
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
  
  router.delete("/:GoalId", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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