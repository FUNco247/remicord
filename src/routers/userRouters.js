import express from "express";
import {
  getEdit,
  handleLogin,
  handleLogout,
  handleJoin,
  getGroupJoin,
  getPersonalJoin,
  postPersonalJoin,
  postLogin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route("/login").get(handleLogin).post(postLogin);
userRouter.get("/logout", handleLogout);
userRouter.get("/join", handleJoin);
userRouter.route("/join/personal").get(getPersonalJoin).post(postPersonalJoin);
userRouter.get("/join/group", getGroupJoin);

userRouter.get("/edit/:id", getEdit);

export default userRouter;
