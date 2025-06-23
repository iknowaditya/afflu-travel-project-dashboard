import mongoose, { Schema, Document, Model } from "mongoose";

export interface LoginHistory {
  timestamp: Date;
  ip: string;
  city: string;
  country: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  role: "user" | "admin";
  loginHistory: LoginHistory[];
}

const LoginHistorySchema = new Schema<LoginHistory>({
  timestamp: { type: Date, required: true },
  ip: { type: String, required: true },
  city: { type: String },
  country: { type: String },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  loginHistory: [LoginHistorySchema],
});

export default (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
