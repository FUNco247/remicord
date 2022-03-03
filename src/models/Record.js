import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  date: { type: String, required: true },
  siteName: { type: String, required: true },
  distance: { type: Number, required: true },
  water: { type: Boolean, default: false },
  overTime: { type: Boolean, default: false },
  nightSupport: { type: Boolean, default: false },
  oiling: { type: Number },
  memo: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Record = mongoose.model("Record", recordSchema);
export default Record;
