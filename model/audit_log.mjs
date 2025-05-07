import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
  action: { type: String, maxlength: 50 },
  performed_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: String, required: true },
});

export default mongoose.model("AuditLog", auditLogSchema);
