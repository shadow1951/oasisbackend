import mongoose, { Schema } from "mongoose";

const hallModel = Schema({
  hall_name: { type: String },
  hall_facility: { type: String },
  capacity: { type: Number },
  type: { type: String },
  primary_in_charge: { type: String },
});

export const Hall = mongoose.model("Hall", hallModel);
