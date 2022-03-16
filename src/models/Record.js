import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  siteName: { type: String, required: true },
  distance: { type: Number },
  water: { type: Number, default: false },
  overTime: { type: Number, default: false },
  nightSupport: { type: Number, default: false },
  oiling: { type: Number },
  memo: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Record = mongoose.model("Record", recordSchema);
export default Record;
