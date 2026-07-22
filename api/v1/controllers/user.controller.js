import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const exitsEmail = await User.findOne({email: req.body.email, deleted: false});
  if (exitsEmail) {
    return res.json({code: 400, message: "Email đã tồn tại"});
  }

  const password = await bcrypt.hash(req.body.password, 12);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: password,
  });
  await user.save();

  res.cookie("token", user.token);
  res.json({code: 200, message: "Tạo tài khoản thành công"});
};

export const login = async (req, res) => {
  const user = await User.findOne({email: req.body.email, deleted: false});
  if (!user) {
    return res.json({code: 400, message: "Email không tồn tại"});
  }

  if (!user.password) {
    return res.json({code: 400, message: "Tài khoản này chưa có mật khẩu (tạo từ trước)"});
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.json({code: 400, message: "Sai mật khẩu"});
  }

  res.cookie("token", user.token);
  res.json({code: 200, message: "Đăng nhập thành công"});
}
