import jwt from "jsonwebtoken";
import config from "config";

export default (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (token) {
    const { user } = jwt.verify(token, config.get("jwtSecret"));
    req.user = user.id;
    return next();
  }
  res.sendStatus(401);
};
