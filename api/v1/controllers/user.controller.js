import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import ForgotPassword from "../models/forgotPassword.model.js";
import crypto from "crypto";
import {sendMail} from "../../../helpers/sendMail.helper.js";

export const register = async (req, res) => {
  const exitsEmail = await User.findOne({email: req.body.email, deleted: false});
  if (exitsEmail) {
    return res.json({code: 400, message: "Email đã tồn tại"});
  }

  const password = await bcrypt.hash(req.body.password, 12);
  const user = new User({
    fullName: req.body.fullName, email: req.body.email, password: password,
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

export const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({email: email});
  if (!user) {
    res.json({code: 400, message: "Email không tồn tại"});
    return;
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  const forgotPassword = new ForgotPassword({email: email, otp: otp, expireAt: new Date(Date.now() + 180000)});
  await forgotPassword.save();
  await sendMail(email, "Mã OTP", `<h3>${otp}</h3>`);
  res.json({code: 200, message: "Gửi mã OTP thành công"})
}

export const otpPassword = async (req, res) => {
  const {email, otp} = req.body;

  const check = await ForgotPassword.findOne({email: email, otp: otp});
  if (!check) {
    return res.json({code: 400, message: "OTP không hợp lệ"});
  }

  const user = await User.findOne({email: email});
  res.cookie("token", user.token);
  res.json({code: 200, message: "Xác thực thành công", token: user.token});
}

export const resetPassword = async (req, res) => {
  const token = req.cookies.token || req.body.token;
  const password = req.body.password;

  if (!token) {
    return res.json({code: 400, message: "Không tìm thấy token xác thực"});
  }

  const user = await User.findOne({token: token, deleted: false});
  if (!user) {
    return res.json({code: 400, message: "Người dùng không tồn tại"});
  }

  const hashPassword = await bcrypt.hash(password, 12);

  await User.updateOne({token: token}, {password: hashPassword});

  res.json({code: 200, message: "Đổi mật khẩu thành công"});
}

export const detail = async (req, res) => {
  const token = req.cookies.token;
  const user = await User.findOne({token: token, deleted: false}).select("-token -password");
  res.json({code: 200, message: "Thành công", info: user})
}
