import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, maxlength: 50, required: true },
  email: { type: String, maxlength: 100, required: true },
  phoneNumber: { type: String, maxlength: 15 },
  password: { type: String, maxlength: 255, required: true },
  role: { type: String, maxlength: 20 },
});

export default mongoose.model("User", userSchema);
