import express from "express";
const router = express.Router();
// import User from "../db";

// router.get("/", async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.findByToken(token);

//     res.send(user);
//   } catch (err) {
//     res.sendStatus(404);
//     next(err);
//   }
// });

export default router;
