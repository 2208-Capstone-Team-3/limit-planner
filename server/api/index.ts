import express from "express";
import userRouter from "./userRouter.js";
import accountRouter from "./accountRouter.js";
import authRouter from "./auth.js";
import goalsRouter from "./goalsRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/goals", goalsRouter);

export default router;
