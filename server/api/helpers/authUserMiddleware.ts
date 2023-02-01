import { User } from "../../db/index.js";
import jwt from "jsonwebtoken";
import { JWT } from "./superSecret.js";
import { UserAttributes } from "../../db/models/User.model.js";
import { Response, Request, NextFunction } from "express";

export interface authUserRequestInterface extends Request {
  headers: { authorization: string };
  user: UserAttributes;
}
export interface authUserResponseInterface extends Response {
  headers: { authorization: string };
  user: UserAttributes;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the header sent by the user = Bearer 1234254asdfawef
  const header = req.headers.authorization;

  // Separate the token from the "Bearer" word
  const token = header && header.split(" ")[1]; // "1234254asdfawef"

  // If no token was given, give them a 404
  if (!token) return res.sendStatus(404);

  jwt.verify(token, JWT, async (err, user) => {
    // If it was an invalid token, give them a 404
    if (err) return res.sendStatus(404);

    // Do stuff with our user
    if (typeof user === "object") {
      const userInfo = await User.findByPk(user.id);
      if (!userInfo) return res.sendStatus(404);

      req.body.user = userInfo;
      next();
    }
  });
};

export const optionalUserAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token) return next();

  jwt.verify(token, JWT, async (err, user) => {
    if (err) return next();

    const userInfo = await User.findByPk(req.body.user.id);
    if (!userInfo) return next();

    req.body.user = userInfo;
    next();
  });
};
