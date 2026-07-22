import express from "express";
import * as controller from "../controllers/user.controller.js";
import * as validate from "../validates/user.validate.js";

const router = express.Router();

router.post("/register", validate.register, controller.register);
router.post("/login", validate.login, controller.login);
router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.post("/password/reset", controller.resetPassword);

export default router;