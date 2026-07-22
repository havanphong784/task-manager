import User from "../models/user.model.js";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return;
  }
  const user = await User.findOne({token: token}).select("-password -token");
  if (!user) {
    return;
  }
  req.user = user;
  next();
}
