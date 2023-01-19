import express from "express";
import { User } from "../db/index.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.prototype.findByToken(token);

    res.send(user);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

export default router;
