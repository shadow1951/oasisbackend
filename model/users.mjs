import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, maxlength: 50, required: true },
  email: { type: String, maxlength: 100, required: true },
  phoneNumber: { type: String, maxlength: 15 },
  password: { type: String, maxlength: 255, required: true },
  role: {
    type: String,
    maxlength: 30,
    required: true,
    enum: [
      "ViceChancellor",
      "MaintenanceOfficer",
      "VCPersonalAssistant",
      "ArrupeBlockDirector",
      "NAAC",
    ],
  },
});

export default mongoose.model("User", userSchema);
