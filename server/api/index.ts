import express from "express";
import userRouter from "./userRouter.js";
import accountRouter from "./accountRouter.js";
import authRouter from "./auth.js";
import  entryRouters from "./entryRouters.js"
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/entry", entryRouters);

export default router;
