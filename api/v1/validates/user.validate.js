export const register = (req, res, next) => {
  if (!req.body.fullName) {
    return res.json({code: 400, message: "Vui lòng nhập họ tên!"});
  }
  if (!req.body.email) {
    return res.json({code: 400, message: "Vui lòng nhập email!"});
  }
  if (!req.body.password) {
    return res.json({code: 400, message: "Vui lòng nhập mật khẩu!"});
  }
  next();
};

export const login = (req, res, next) => {
  if (!req.body.email) {
    return res.json({code: 400, message: "Vui lòng nhập email!"});
  }
  if (!req.body.password) {
    return res.json({code: 400, message: "Vui lòng nhập mật khẩu!"});
  }
  next();
};
