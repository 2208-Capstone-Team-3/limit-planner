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
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (!token) return res.sendStatus(404);

  jwt.verify(token, JWT, async (err, user) => {
    if (err instanceof Error) return res.status(404).send(err.message);

    const userInfo = await User.findByPk(req.body.user.id);
    if (!userInfo) return res.sendStatus(404);

    res.locals = {
      ...res.locals,
      user: userInfo,
    };
    next();
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
