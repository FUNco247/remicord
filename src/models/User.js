import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  plateNumber: { type: String, required: true, unique: true },
  group: {
    code: { type: String, unique: true },
    position: { type: Number, default: 0 },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
