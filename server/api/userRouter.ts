import express from "express";
import { User } from "../db/index.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) return res.status(404).send("No Token Found");

    const user = await User.prototype.findByToken(token);

    res.send(user);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

export default router;
