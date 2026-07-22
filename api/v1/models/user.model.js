import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  token: {
    type: String,
    default: () => crypto.randomUUID()
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
}, {timestamps: true});

const User = mongoose.model("User", userSchema, "users");

export default User;
