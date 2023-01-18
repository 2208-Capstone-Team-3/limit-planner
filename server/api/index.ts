import express from "express";
const router = express.Router();
import userRouter from "./userRouter.js";

router.use("/user", userRouter);

export default router;
