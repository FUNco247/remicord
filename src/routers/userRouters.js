import express from "express";
import {
  getEdit,
  handleLogin,
  handleLogout,
  handleJoin,
  getGroupJoin,
  getPersonalJoin,
  postPersonalJoin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/login", handleLogin);
userRouter.get("/logout", handleLogout);
userRouter.get("/join", handleJoin);
userRouter.route("/join/personal").get(getPersonalJoin).post(postPersonalJoin);
userRouter.get("/join/group", getGroupJoin);

userRouter.get("/edit", getEdit);

export default userRouter;
