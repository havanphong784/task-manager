import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const exitsEmail = await User.findOne({email: req.body.email, deleted: false})
  if (exitsEmail) {
    res.json({code: 400, message: "Email đã tồn tại"});
  } else {
    const password = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      fullName: req.body.fullName, email: req.body.email, password: password,
    });
    await user.save();
    res.cookie("token", user.token);
    res.json({code: 200, message: "Tạo tài khoản thành công"});
  }
}