import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  plateNumber: { type: String, unique: true },
  group: {
    name: { type: String, default: null },
    node: { type: String },
    position: { type: Number, default: 0 },
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  } // password가 modify 될때만 true를 반환한다.
});

const User = mongoose.model("User", userSchema);
export default User;
