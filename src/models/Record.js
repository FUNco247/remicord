import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  date: { type: String, required: true },
  siteName: { type: String, required: true },
  distance: { type: Number, required: true },
  water: { type: Boolean, default: null },
  overTime: { type: Boolean, default: null },
  nightSupport: { type: Boolean, default: null },
  oiling: { type: Number },
  memo: { type: String },
});

const Record = mongoose.model("Record", recordSchema);
export default Record;
