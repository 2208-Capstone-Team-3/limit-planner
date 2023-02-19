import express, { Request, Response, NextFunction, response } from "express";
import { User, Skipdate } from "../db/index.js";
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

//TEST API
// api/users/skipdates
router.get(
  "/skipdates", 
  async (req: Request, res: Response, next: NextFunction) => {
    const foundUser = await User.findAll({
      include: [Skipdate]
    });
    if(foundUser) {res.send(foundUser)} 
    else {res.send([{name: "couldnt find anything"}])}
});

export default router;
