import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  turn: { type: Number, required: true },
  siteName: { type: String, required: true },
  distance: { type: Number, required: true },
  extraFee: {
    water: { type: Boolean },
    overTime: { type: Boolean },
    nightSupport: { type: Boolean },
  },
  oiling: { type: Number },
  memo: { type: String },
});

const Record = mongoose.model("Record", recordSchema);
export default Record;
