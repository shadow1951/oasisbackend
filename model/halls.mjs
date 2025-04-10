import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
  hall_name: { type: String, maxlength: 100 },
  hall_facility: { type: String },
  capacity: { type: Number },
  type: { type: String, maxlength: 10 },
  primary_in_charge: { type: String, maxlength: 100 },
});

export default mongoose.model("Hall", hallSchema);
