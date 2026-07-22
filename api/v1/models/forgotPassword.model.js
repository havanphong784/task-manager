import mongoose from 'mongoose';

const forgotPasswordSchema = mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 0
  }
}, {timestamps: true});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, "forgotPasswords");
export default ForgotPassword;