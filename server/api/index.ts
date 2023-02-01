import express from "express";
import userRouter from "./userRouter.js";
import accountsRouter from "./accountsRouter.js";
import authRouter from "./auth.js";
import goalsRouter from "./goalsRouter.js";
import entriesRouter from "./entriesRouter.js";
import eventsRouter from "./eventsRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/accounts", accountsRouter);
router.use("/entries", entriesRouter);
router.use("/goals", goalsRouter);
router.use("/events", eventsRouter);

export default router;
